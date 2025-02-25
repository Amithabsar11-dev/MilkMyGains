const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Shopify Storefront API Details
const SHOPIFY_BASE_URL = "https://milk-my-gains.myshopify.com/api/2024-10/graphql.json";
const STORE_FRONT_ACCESS_TOKEN = "b49fae102098a23e7a2b663dbc0e4d48";

//Omnisend API
const OMNISEND_API_KEY = "67bc5f6c532625c406fdf16a-kPttxT0hf5yvBAQj770IiAq5hMsJ89PGaEFh16lcQ66HdUYt7V";

// MongoDB URI 
const MONGO_URI = "mongodb+srv://amithabsar11:amithabsar11@cluster11.klfyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster11";

// Connect to MongoDB Atlas
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// User Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopifyCustomerId: { type: String }
});
const User = mongoose.model("User", UserSchema);

// Judge.me API Details
const JUDGEME_API_URL = "https://judge.me/api/v1/reviews";
const JUDGEME_PRIVATE_TOKEN = "zZ3TqyUcS2RE6uJ3KtSXWdFtHfw";  // Replace with your actual Judge.me API token
const SHOP_DOMAIN = "milk-my-gains.myshopify.com";  // Replace with your actual Shopify domain


// Signup API
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Shopify Customer
    const query = `
      mutation {
        customerCreate(input: {
          firstName: "${name}",
          email: "${email}",
          password: "${password}"
        }) {
          customer { id }
          userErrors { field message }
        }
      }
    `;

    const shopifyResponse = await axios.post(
      SHOPIFY_BASE_URL,
      { query },
      { headers: { "X-Shopify-Access-Token": STORE_FRONT_ACCESS_TOKEN, "Content-Type": "application/json" } }
    );

    const shopifyCustomer = shopifyResponse.data.data.customerCreate.customer;
    if (!shopifyCustomer) return res.status(400).json({ message: "Failed to create Shopify customer" });

    user = new User({ name, email, password: hashedPassword, shopifyCustomerId: shopifyCustomer.id });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Forgot Password API
app.post("/api/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `Click the link to reset your password: http://localhost:3000/reset-password/${resetToken}`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: "Failed to send email" });
      res.status(200).json({ message: "Reset email sent" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch User Order History from Shopify
app.get("/api/order-history", async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const query = `
      query {
        customer(id: "${user.shopifyCustomerId}") {
          orders(first: 5) {
            edges {
              node {
                name
                totalPriceV2 { amount currencyCode }
                lineItems(first: 5) {
                  edges {
                    node {
                      title quantity originalTotalPrice { amount }
                    }
                  }
                }
                processedAt
              }
            }
          }
        }
      }
    `;

    const shopifyResponse = await axios.post(
      SHOPIFY_BASE_URL,
      { query },
      { headers: { "X-Shopify-Access-Token": STORE_FRONT_ACCESS_TOKEN, "Content-Type": "application/json" } }
    );

    res.status(200).json(shopifyResponse.data.data.customer.orders.edges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

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
        images(first: 10) {
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
               image {
                src
                altText
              }
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

//Newsletter 

app.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Send subscriber data to Omnisend
    const response = await axios.post(
      "https://api.omnisend.com/v5/contacts",
      {
        email: email,
        status: "subscribed", // Add the subscriber
        tags: ["Newsletter"], // Optional: Add custom tags
      },
      {
        headers: {
          "Authorization": `Bearer ${OMNISEND_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      message: "Subscription successful! Thank you for subscribing."
    });

  } catch (error) {
    console.error("Error subscribing user:", error.response?.data || error.message);
    res.status(500).json({
      error: "Subscription failed. Please try again later.",
      details: error.response?.data || error.message
    });
  }
});
// console.log("Shopify API Full Response:", JSON.stringify(shopifyResponse, null, 2));

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
