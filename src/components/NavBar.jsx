import React, { useState } from "react";
import { useSelector } from "react-redux";
import RegisterForm from "./RegisterForm"; 

export default function NavBar() {
  const [showRegisterForm, setShowRegisterForm] = useState(false); 
  const state = useSelector((state) => state.handleCart);

  const handleAdminClick = () => {
    setShowRegisterForm(true); 
  };

  return (
    <>
      {showRegisterForm ? (
        <RegisterForm /> 
      ) : (
        <nav className="navbar navbar-expand-lg bg-white navbar-light bg-dark py-3 shadow-sm">
          <div className="container">
            <a className="navbar-brand" href="/">
              Ecommerce
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo01"
              aria-controls="navbarTogglerDemo01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <div className="navbar-nav">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
                <a className="nav-link" href="/Products">
                  Products
                </a>
                <a className="nav-link" href="/contact">
                  Contact
                </a>
                <div className="nav-link buttons">
                  <a href="/login" className="btn btn-outline-dark">
                    <i className="fa fa-sign-in me-1"></i> Login
                  </a>
                  <a href="/register" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-user-plus me-1"></i> Register
                  </a>
                  <a href="/cart" className="btn btn-outline-dark ms-2">
                    <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
                  </a>
                  <button onClick={handleAdminClick} className="btn btn-outline-dark ms-2">
                    <i className="fa fa-user-plus me-1"></i> Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}