import React, { useState } from "react";
import axios from "axios";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/insert", formData);
      console.log("User registered:", response.data);
      window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
      console.error("There was an error registering the user:", error);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        background: "url('https://videos.pexels.com/video-files/1721320/1721320-sd_640_360_25fps.mp4')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1
        }}
      >
        <source src="https://videos.pexels.com/video-files/5562986/5562986-sd_640_360_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        style={{
          position: "relative",
          padding: "20px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Register
        </h1>
        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="col-md-6">
            <label htmlFor="name" style={{ display: "block", marginBottom: "5px", fontWeight: "bold",color:"black" }}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid rgba(0, 0, 0, 0.2)", // Light border color
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px"
              }}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="email" style={{ display: "block", marginBottom: "5px", fontWeight: "bold",color:"black"}}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid rgba(0, 0, 0, 0.2)", // Light border color
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px"
              }}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="password" style={{ display: "block", marginBottom: "5px", fontWeight: "bold",color:"black" }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid rgba(0, 0, 0, 0.2)", // Light border color
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px"
              }}
            />
            <div className="invalid-feedback">Please provide a password.</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "5px", fontWeight: "bold",color:"black" }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid rgba(0, 0, 0, 0.2)", // Light border color
                borderRadius: "4px",
                boxSizing: "border-box",
                fontSize: "14px"
              }}
            />
            <div className="invalid-feedback">Please confirm your password.</div>
          </div>
          <div className="col-12">
            <div className="form-check" style={{ display: "flex", alignItems: "center" }}>
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                required
                style={{ marginRight: "10px" }}
              />
              <label className="form-check-label" htmlFor="terms" style={{color:"black"}}>
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button
              type="submit"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                textAlign: "center",
                transition: "background-color 0.3s ease"
              }}
            >
              Submit form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
