import React, { useState } from "react";
import "./AdminSettingsPage.css"; 

export default function AdminSettingsPage() {
  const [newProduct, setNewProduct] = useState({
    id: "",
    title: "",
    image: "",
    price: "",
    category: "",
  });

  const [products, setProducts] = useState([]); 
  const [selectedImage, setSelectedImage] = useState(null); 
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    setProducts([...products, newProduct]);

    alert("Product added successfully!");

    setNewProduct({
      id: "",
      title: "",
      image: "",
      price: "",
      category: "",
    });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="admin-settings-container">
      <form className="admin-settings-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={newProduct.id}
          onChange={handleChange}
          placeholder="Product ID"
          required
        />
        <input
          type="text"
          name="title"
          value={newProduct.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
        />
        <input
          type="text"
          name="image"
          value={newProduct.image}
          onChange={handleChange}
          placeholder="Product Image URL"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
        />
        <input
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          placeholder="Product Category"
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {products.length > 0 && (
        <table className="admin-settings-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    width="50"
                    onClick={() => handleImageClick(product.image)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td>{product.price}</td>
                <td>{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedImage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <img src={selectedImage} alt="Full Size" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}
