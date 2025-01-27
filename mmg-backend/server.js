const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Shopify Storefront API Details
const SHOPIFY_BASE_URL = "https://milk-my-gains.myshopify.com/api/2024-10/graphql.json";
const STORE_FRONT_ACCESS_TOKEN = "b49fae102098a23e7a2b663dbc0e4d48";


// Judge.me API Details
const JUDGEME_API_URL = "https://judge.me/api/v1/reviews";
const JUDGEME_PRIVATE_TOKEN = "zZ3TqyUcS2RE6uJ3KtSXWdFtHfw";  // Replace with your actual Judge.me API token
const SHOP_DOMAIN = "milk-my-gains.myshopify.com";  // Replace with your actual Shopify domain


// Helper to call Shopify Storefront API
const shopifyRequest = async (query, variables = {}) => {
  try {
    const response = await axios.post(
      SHOPIFY_BASE_URL,
      { query, variables },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": STORE_FRONT_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.errors) {
      console.error("Shopify API Errors:", response.data.errors);
      throw new Error("Shopify API call failed.");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error in Shopify API request:", error.message);
    throw error;
  }
};

// Fetch reviews for a product
app.get("/api/reviews/:handle", async (req, res) => {
  const { handle } = req.params;

  const JUDGEME_PRIVATE_TOKEN = "zZ3TqyUcS2RE6uJ3KtSXWdFtHfw";
  const JUDGEME_API_URL = "https://judge.me/api/v1/reviews";

  try {
    const response = await axios.get(JUDGEME_API_URL, {
      params: {
        shop_domain: "milk-my-gains.myshopify.com",
        api_token: JUDGEME_PRIVATE_TOKEN,
        product_handle: handle,
      },
    });

    if (!response.data.reviews?.length) {
      return res.status(404).json({ message: "No reviews found for this product." });
    }

    res.status(200).json(response.data.reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch reviews from Judge.me." });
  }
});


// Helper function to get Judge.me product ID using Shopify product ID
const getJudgeMeProductId = async (shopifyProductId) => {
  const JUDGEME_API_URL = `https://judge.me/api/v1/products/${shopifyProductId}`;

  try {
    const response = await axios.get(JUDGEME_API_URL, {
      params: {
        api_token: JUDGEME_PRIVATE_TOKEN,
        shop_domain: SHOP_DOMAIN,
        shopify_product_id: shopifyProductId,
      },
    });

    if (response.data && response.data.product) {
      console.log("Judge.me Product ID Found:", response.data.product.id);
      return response.data.product.id;
    } else {
      throw new Error("Product ID not found in Judge.me response.");
    }
  } catch (error) {
    console.error("Error fetching Judge.me product ID:", error.response?.data || error.message);
    throw new Error("Failed to fetch Judge.me product ID.");
  }
};

// Endpoint to submit a product review
app.post("/api/reviews", async (req, res) => {
  const {
    shopify_product_id,
    review_title,
    review_body,
    reviewer_name,
    reviewer_email,
    rating,
  } = req.body;

  // Validate input fields
  if (!shopify_product_id || !review_title || !review_body || !reviewer_name || !reviewer_email || !rating) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Fetch Judge.me product ID
    const product_id = await getJudgeMeProductId(shopify_product_id);
    if (!product_id) {
      return res.status(500).json({ error: "Unable to map Shopify product to Judge.me product." });
    }

    const payload = {
      api_token: JUDGEME_PRIVATE_TOKEN,
      shop_domain: SHOP_DOMAIN,
      product_id: String(product_id),
      title: review_title,
      body: review_body,
      name: reviewer_name,
      email: reviewer_email,
      rating,
      review_type: "product",
    };

    console.log("Payload being sent to Judge.me:", payload);

    const JUDGEME_REVIEW_API_URL = "https://judge.me/api/v1/reviews";
    const response = await axios.post(JUDGEME_REVIEW_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response from Judge.me:", response.data);

    if (response.data && response.data.status === "success") {
      return res.status(201).json({
        message: "Review submitted successfully and will be processed shortly.",
      });
    }

    return res.status(202).json({
      message: "Review is being processed and will appear shortly.",
    });
  } catch (error) {
    console.error("Error submitting review:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to submit review." });
  }
});

// Fetch all products
app.get("/api/products", async (req, res) => {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            handle
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `;
  try {
    const data = await shopifyRequest(query);
    // Ensure handle is present, or generate one from the title
    const products = data.products.edges.map((edge) => {
      const product = edge.node;
      return {
        ...product,
        handle: product.handle || product.title.toLowerCase().replace(/\s+/g, "-"),
      };
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Fetch a single product by handle
app.get("/api/product/:handle", async (req, res) => {
  const { handle } = req.params;
  const query = `
    {
      productByHandle(handle: "${handle}") {
        title
        description
        metafields(identifiers: [
        { namespace: "faq", key: "list" },
        { namespace: "nutritional", key: "highlights" },
        { namespace: "product", key: "comparison" },
        { namespace: "product", key: "ingredients" },
        { namespace: "graph", key: "chart" }
        { namespace: "new", key: "accordion_content" }
        { namespace: "new", key: "faq" },
      ]) {
        namespace
        key
        value
        type
      }
        images(first: 1) {
          edges {
            node {
              src
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
              quantityAvailable
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(query);
    const product = data.productByHandle;

    console.log('Raw Metafields:', product.metafields);

    // Parse the metafield value if it exists
    if (product.metafields && product.metafields.length > 0) {
      console.log('Raw Metafields:', product.metafields);

      product.metafields = product.metafields
        .filter((metafield) => metafield !== null)
        .map((metafield) => {
          if (metafield.value) {
            try {
              console.log(`Parsing metafield: ${metafield.namespace}.${metafield.key}`, metafield.value);
              metafield.value = JSON.parse(metafield.value); // Parse JSON
            } catch (error) {
              console.error(`Error parsing metafield ${metafield.namespace}.${metafield.key}:`, error);
              metafield.value = metafield.value; // Keep as raw string if parsing fails
            }
          }
          return metafield;
        });

      console.log('Parsed Metafields:', product.metafields);
    }


    console.log('Parsed Metafields:', product.metafields);
    console.log('Final Product Data:', product);

    // Add some additional logging to see where the metafields data is being reset
    console.log('Metafields before sending response:', product.metafields);

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});
// Create a cart (and get checkout URL)
app.post("/api/cart/create", async (req, res) => {
  const { lines } = req.body; // Array of line items to add to the cart
  if (!lines || !Array.isArray(lines) || lines.length === 0) {
    return res.status(400).json({ error: "'lines' array is required." });
  }

  const query = `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
                quantity
                attributes {
                  key
                  value
                }
              }
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
        attributes: [
          {
            key: "discountedPrice",
            value: line?.price ? line.price.toString() : "0" // Default to "0" if price is undefined
          },
          {
            key: "purchaseOption",
            value: line?.purchaseOption || "N/A" // Default to "N/A" if purchaseOption is undefined
          },
        ],
      })),
    },
  };



  try {
    const data = await shopifyRequest(query, variables);

    console.log("Cart Creation Response:", data);

    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
    }
    res.status(200).json(data.cartCreate.cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to create cart" });
  }
});

// Add product to cart
app.post("/api/cart/add", async (req, res) => {
  const { cartId, variantId, quantity } = req.body;
  if (!cartId || !variantId || !quantity) {
    return res.status(400).json({
      error: "Invalid request. 'cartId', 'variantId', and 'quantity' are required.",
    });
  }

  const query = `
    mutation {
      cartLinesAdd(
        cartId: "${cartId}",
        lines: [{ merchandiseId: "${variantId}", quantity: ${quantity} }]
      ) {
        cart {
          id
          lines(first: 5) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
                quantity
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(query);
    res.status(200).json(data.cartLinesAdd.cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

// View All cart item
app.post("/api/cart/view", async (req, res) => {
  const { cartId } = req.body;
  if (!cartId) {
    return res.status(400).json({
      error: "Invalid request. 'cartId' is required.",
    });
  }

  const query = `
    query {
      cart(id: "${cartId}") {
        id
        lines(first: 50) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                  }
                }
              }
              quantity
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(query);
    res.status(200).json(data.cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart items" });
  }
});


// Update cart item
app.post("/api/cart/update", async (req, res) => {
  const { cartId, lineItemId, quantity } = req.body;
  if (!cartId || !lineItemId || !quantity) {
    return res.status(400).json({
      error: "Invalid request. 'cartId', 'lineItemId', and 'quantity' are required.",
    });
  }

  const query = `
    mutation {
      cartLinesUpdate(
        cartId: "${cartId}",
        lines: [{ id: "${lineItemId}", quantity: ${quantity} }]
      ) {
        cart {
          id
          lines(first: 5) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
                quantity
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(query);
    res.status(200).json(data.cartLinesUpdate.cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart" });
  }
});

// Remove product from cart
app.post("/api/cart/remove", async (req, res) => {
  const { cartId, lineItemId } = req.body;
  if (!cartId || !lineItemId) {
    return res.status(400).json({
      error: "Invalid request. 'cartId' and 'lineItemId' are required.",
    });
  }

  const query = `
    mutation {
      cartLinesRemove(
        cartId: "${cartId}",
        lineIds: ["${lineItemId}"]
      ) {
        cart {
          id
          lines(first: 5) {
            edges {
              node {
                id
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                  }
                }
                quantity
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(query);
    res.status(200).json(data.cartLinesRemove.cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
