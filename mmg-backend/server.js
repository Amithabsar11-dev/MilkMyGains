const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Shopify Storefront API Details
const SHOPIFY_BASE_URL =
  "https://a6f645-75.myshopify.com/api/2024-10/graphql.json";
const STORE_FRONT_ACCESS_TOKEN = "4d435342247d18a7c3331d1fc544ff53";

// Fetch a single product from Shopify
const fetchProductFromShopify = async () => {
  const query = `
  {
    productByHandle(handle: "cosmetic-packaging") {
      title
      description
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
    const response = await axios.post(
      SHOPIFY_BASE_URL,
      { query },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": STORE_FRONT_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      throw new Error("Error fetching data from Shopify");
    }

    return response.data.data.productByHandle;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Fetch all products from Shopify
const fetchProductsFromShopify = async () => {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
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
      }
    }
  `;

  try {
    const response = await axios.post(
      SHOPIFY_BASE_URL,
      { query },
      {
        headers: {
          "X-Shopify-Storefront-Access-Token": STORE_FRONT_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.errors) {
      throw new Error("Error fetching products from Shopify");
    }

    return response.data.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Create a checkout on Shopify
const createCheckout = async (variantId, quantity) => {
  const query = `
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
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
      lineItems: [
        {
          variantId,   // Ensure the variantId is correctly formatted
          quantity,
        },
      ],
    },
  };

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

    console.log("Response Data: ", JSON.stringify(response.data, null, 2));

    if (response.data.errors) {
      console.error("Error in response:", response.data.errors);
      throw new Error("Error creating checkout on Shopify");
    }

    const checkoutUrl = response.data.data.checkoutCreate.checkout.webUrl;
    return checkoutUrl;
  } catch (error) {
    console.error("Error details: ", error.response?.data || error.message);
    throw error;
  }
};


// API Endpoint to serve product data
app.get("/api/product", async (req, res) => {
  try {
    const product = await fetchProductFromShopify();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product data" });
  }
});

// API Endpoint to serve all product data
app.get("/api/products", async (req, res) => {
  try {
    const products = await fetchProductsFromShopify();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// API Endpoint to create a checkout
app.post("/api/checkout", async (req, res) => {
  const { variantId, quantity } = req.body;
  try {
    const checkoutUrl = await createCheckout(variantId, quantity);
    res.status(200).json({ checkoutUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to create checkout" });
  }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
