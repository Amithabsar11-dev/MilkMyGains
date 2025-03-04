const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Allow cross-origin image fetching
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Shopify Storefront API Details
const SHOPIFY_BASE_URL =
  "https://milk-my-gains.myshopify.com/api/2024-10/graphql.json";
const STORE_FRONT_ACCESS_TOKEN = "b49fae102098a23e7a2b663dbc0e4d48";

//Omnisend API
const OMNISEND_API_KEY =
  "67bc5f6c532625c406fdf16a-kPttxT0hf5yvBAQj770IiAq5hMsJ89PGaEFh16lcQ66HdUYt7V";

// // MongoDB URI
// const MONGO_URI =
//   "mongodb+srv://amithabsar11:amithabsar11@cluster11.klfyc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster11";

// // Connect to MongoDB Atlas
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("MongoDB Atlas Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // User Model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   phone: String,
//   password: String,
//   orders: [
//     {
//       orderId: String,
//       products: [
//         {
//           title: String,
//           quantity: Number,
//           price: Number,
//         },
//       ],
//       totalAmount: Number,
//       date: { type: Date, default: Date.now },
//     },
//   ],
// });

// const User = mongoose.model("User", userSchema);

// Judge.me API Details
const JUDGEME_API_URL = "https://judge.me/api/v1/reviews";
const JUDGEME_PRIVATE_TOKEN = "zZ3TqyUcS2RE6uJ3KtSXWdFtHfw"; // Replace with your actual Judge.me API token
const SHOP_DOMAIN = "milk-my-gains.myshopify.com"; // Replace with your actual Shopify domain

// const JWT_SECRET = "your_secret_key";

// // Signup API
// app.post("/api/signup", async (req, res) => {
//   const { name, email, phone, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, phone, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "Signup successful" });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Login API
// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password); // Added await
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.status(200).json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Forgot Password API
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "your_email@gmail.com",
//     pass: "your_app_password",
//   },
// });

// app.post("/api/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Email not found" });
//     }

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     const resetLink = `http://yourfrontend.com/reset-password?token=${token}`; // Link FIXED

//     const mailOptions = {
//       from: "amith.wings@gmail.com",
//       to: email,
//       subject: "Password Reset Request",
//       html: `<p>You requested to reset your password.</p>
//             <p>Click the link below to reset your password:</p>
//             <a href="${resetLink}">${resetLink}</a>
//             <p>The link is valid for 1 hour.</p>`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "Password reset email sent" });
//   } catch (err) {
//     console.error("Forgot Password Error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// //Reset Password
// app.post("/api/reset-password", async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res.status(400).json({ error: "Invalid or expired token" });
//     }

//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password reset successful" });
//   } catch (err) {
//     res.status(400).json({ error: "Invalid or expired token" });
//   }
// });

// // Fetch User Profile & Order History from Shopify
// const authenticate = (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });

//   try {
//     const tokenWithoutBearer = token.replace("Bearer ", ""); // FIXED
//     const verified = jwt.verify(tokenWithoutBearer, JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// app.get("/api/profile", authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Fetch User Orders from Shopify
// app.get("/api/profile", authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");

//     const shopifyOrdersQuery = `
//       {
//         orders(first: 10, query: "email:${user.email}") {
//           edges {
//             node {
//               id
//               name
//               totalPriceV2 {
//                 amount
//                 currencyCode
//               }
//               lineItems(first: 5) {
//                 edges {
//                   node {
//                     title
//                     quantity
//                     originalTotalPrice {
//                       amount
//                       currencyCode
//                     }
//                   }
//                 }
//               }
//               processedAt
//             }
//           }
//         }
//       }
//     `;

//     const shopifyResponse = await shopifyRequest(shopifyOrdersQuery);

//     const orders = shopifyResponse.orders.edges.map((order) => ({
//       orderId: order.node.name,
//       totalAmount: order.node.totalPriceV2.amount,
//       date: order.node.processedAt,
//       products: order.node.lineItems.edges.map((item) => ({
//         title: item.node.title,
//         quantity: item.node.quantity,
//         price: item.node.originalTotalPrice.amount,
//       })),
//     }));

//     res.status(200).json({ user, orders });
//   } catch (err) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Customer Signup API

app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          firstName
          lastName
          email
          phone
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: { firstName, lastName, email, password, phone },
  };

  try {
    const data = await shopifyRequest(query, variables);
    if (data.customerCreate.customer) {
      res.status(201).json({ message: "Signup successful!" });
    } else {
      res.status(400).json({ error: data.customerCreate.customerUserErrors });
    }
  } catch (error) {
    res.status(500).json({ error: "Signup failed." });
  }
  console.log("Signup request received:", req.body);
});

// Customer Login API

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const query = `
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  const variables = { input: { email, password } };

  try {
    const data = await shopifyRequest(query, variables);
    if (data.customerAccessTokenCreate.customerAccessToken) {
      res.status(200).json(data.customerAccessTokenCreate.customerAccessToken);
    } else {
      res
        .status(400)
        .json({ error: data.customerAccessTokenCreate.customerUserErrors });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed." });
  }
});

// Forgot Password API

app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;

  const query = `
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const data = await shopifyRequest(query, { email });
    if (!data.customerRecover.customerUserErrors.length) {
      res.status(200).json({ message: "Password reset email sent!" });
    } else {
      res.status(400).json({ error: data.customerRecover.customerUserErrors });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to send reset email." });
  }
});

// Profile API (User Info + Order History)

app.get("/api/profile", async (req, res) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const query = `
    {
      customer(customerAccessToken: "${accessToken}") {
        firstName
        lastName
        email
        phone
        orders(first: 10) {
          edges {
            node {
              name
              totalPriceV2 {
                amount
                currencyCode
              }
              processedAt
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    originalTotalPrice {
                      amount
                      currencyCode
                    }
                  }
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
    if (data.customer) {
      res.status(200).json(data.customer);
    } else {
      res.status(400).json({ error: "Failed to fetch profile." });
    }
  } catch (error) {
    res.status(500).json({ error: "Profile fetch failed." });
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
      return res
        .status(404)
        .json({ message: "No reviews found for this product." });
    }

    res.status(200).json(response.data.reviews);
  } catch (error) {
    console.error(
      "Error fetching reviews:",
      error.response?.data || error.message
    );
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
    console.error(
      "Error fetching Judge.me product ID:",
      error.response?.data || error.message
    );
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
  if (
    !shopify_product_id ||
    !review_title ||
    !review_body ||
    !reviewer_name ||
    !reviewer_email ||
    !rating
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Fetch Judge.me product ID
    const product_id = await getJudgeMeProductId(shopify_product_id);
    if (!product_id) {
      return res
        .status(500)
        .json({ error: "Unable to map Shopify product to Judge.me product." });
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
    console.error(
      "Error submitting review:",
      error.response?.data || error.message
    );
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
        handle:
          product.handle || product.title.toLowerCase().replace(/\s+/g, "-"),
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

    console.log("Raw Metafields:", product.metafields);

    // Parse the metafield value if it exists
    if (product.metafields && product.metafields.length > 0) {
      console.log("Raw Metafields:", product.metafields);

      product.metafields = product.metafields
        .filter((metafield) => metafield !== null)
        .map((metafield) => {
          if (metafield.value) {
            try {
              console.log(
                `Parsing metafield: ${metafield.namespace}.${metafield.key}`,
                metafield.value
              );
              metafield.value = JSON.parse(metafield.value); // Parse JSON
            } catch (error) {
              console.error(
                `Error parsing metafield ${metafield.namespace}.${metafield.key}:`,
                error
              );
              metafield.value = metafield.value; // Keep as raw string if parsing fails
            }
          }
          return metafield;
        });

      console.log("Parsed Metafields:", product.metafields);
    }

    console.log("Parsed Metafields:", product.metafields);
    console.log("Final Product Data:", product);

    // Add some additional logging to see where the metafields data is being reset
    console.log("Metafields before sending response:", product.metafields);

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
            value: line?.price ? line.price.toString() : "0", // Default to "0" if price is undefined
          },
          {
            key: "purchaseOption",
            value: line?.purchaseOption || "N/A", // Default to "N/A" if purchaseOption is undefined
          },
        ],
      })),
    },
  };

  try {
    const data = await shopifyRequest(query, variables);

    console.log("Cart Creation Response:", data);

    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(
        data.cartCreate.userErrors.map((e) => e.message).join(", ")
      );
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
      error:
        "Invalid request. 'cartId', 'variantId', and 'quantity' are required.",
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
      error:
        "Invalid request. 'cartId', 'lineItemId', and 'quantity' are required.",
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
          Authorization: `Bearer ${OMNISEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      message: "Subscription successful! Thank you for subscribing.",
    });
  } catch (error) {
    console.error(
      "Error subscribing user:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Subscription failed. Please try again later.",
      details: error.response?.data || error.message,
    });
  }
});
// console.log("Shopify API Full Response:", JSON.stringify(shopifyResponse, null, 2));

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
