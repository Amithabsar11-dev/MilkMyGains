import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
        try {
          console.log("Using Token:", token); // Debug log
      
          const response = await axios.get("http://localhost:3001/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          console.log("Profile Response:", response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error.response?.data || error);
          alert("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      };   
    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (!user) return <h2>Loading profile...</h2>;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>

      <h3>Order History</h3>
      {user.orders.edges.length > 0 ? (
        <ul>
          {user.orders.edges.map((order, index) => (
            <li key={index}>
              <p><strong>Order ID:</strong> {order.node.name}</p>
              <p><strong>Total Price:</strong> {order.node.totalPriceV2.amount} {order.node.totalPriceV2.currencyCode}</p>
              <p><strong>Date:</strong> {new Date(order.node.processedAt).toLocaleDateString()}</p>
              <p><strong>Items:</strong></p>
              <ul>
                {order.node.lineItems.edges.map((item, idx) => (
                  <li key={idx}>
                    {item.node.title} (x{item.node.quantity}) - {item.node.originalTotalPrice.amount} {item.node.originalTotalPrice.currencyCode}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
