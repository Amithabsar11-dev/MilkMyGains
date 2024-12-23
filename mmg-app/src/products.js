import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductDisplay = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/product");
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product data");
      }
    };

    fetchProduct();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, description, images, variants } = product;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>

      {images && images.edges.length > 0 && (
        <img
          src={images.edges[0].node.src}
          alt={images.edges[0].node.altText || "Product Image"}
          style={{ width: "300px", height: "auto" }}
        />
      )}

      <h2>Variants:</h2>
      <ul>
        {variants.edges.map(({ node }) => (
          <li key={node.id}>
            <strong>{node.title}:</strong> {node.priceV2.amount}{" "}
            {node.priceV2.currencyCode} -{" "}
            {node.availableForSale ? "Available" : "Out of Stock"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDisplay;
