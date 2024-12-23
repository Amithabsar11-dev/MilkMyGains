const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Shopify Storefront API Details
const SHOPIFY_BASE_URL =
  "https://milkmygains.myshopify.com/api/2024-10/graphql.json";
const STORE_FRONT_ACCESS_TOKEN = "303f6d9b232e2dc8968044165e9e2ac6";

// Fetch product from Shopify
const fetchProductFromShopify = async () => {
  const query = `
{
  productByHandle(handle: "paneer") {
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
    console.log(response.data); // Log the response for debugging

    // Check for errors in response
    if (response.data.errors) {
      console.error("GraphQL errors:", response.data.errors);
      throw new Error("Error fetching data from Shopify");
    }

    return response.data.data.productByHandle;
  } catch (error) {
    console.error("Error fetching product:", error);
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

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
