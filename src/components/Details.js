import React, { useState, useEffect } from 'react';
import ConfirmationPage from './ConfirmationPage'; 
import './Details.css';

export default function Details() {
    const [formData, setFormData] = useState({
        customerName: '',
        customerNumber: '',
        productName: '',
        address: '',
    });

    const [productDetails, setProductDetails] = useState(null);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [showDummyPage, setShowDummyPage] = useState(false);
    const [dummyPageContent, setDummyPageContent] = useState('');
    const [orderConfirmed, setOrderConfirmed] = useState(false); 

    useEffect(() => {
        const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
        if (selectedProduct) {
            setProductDetails(selectedProduct);
            setFormData((prevFormData) => ({
                ...prevFormData,
                productName: selectedProduct.title,
            }));
        }
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';
        script.type = 'module';
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowPaymentOptions(true);
    };

    const handlePayment = (method) => {
        setSelectedPaymentMethod(method);
        if (method === 'Pay Online') {
            setShowDummyPage(true);
            setDummyPageContent(
                <div className="payment-options">
                    <button onClick={() => handlePaymentOptionClick('GPay')}>GPay</button>
                    <button onClick={() => handlePaymentOptionClick('Paytm')}>Paytm</button>
                    <button onClick={() => handlePaymentOptionClick('Credit Card')}>Credit Card</button>
                </div>
            );
        } else if (method === 'Cash on Delivery') {
            setOrderConfirmed(true); 
        }
    };

    const handlePaymentOptionClick = (method) => {
        let content = '';
        const handlePaymentSubmit = (e) => {
            e.preventDefault();
            setOrderConfirmed(true); 
        };

        if (method === 'GPay') {
            content = (
                <div className="dummy-form">
                    <h3>GPay Payment</h3>
                    <form className="dummy-payment-form" onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                            <label htmlFor="gpayEmail">GPay Email:</label>
                            <input type="email" id="gpayEmail" name="gpayEmail" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gpayAmount">Amount to Pay:</label>
                            <input type="text" id="gpayAmount" name="gpayAmount" value={productDetails && productDetails.price} readOnly />
                        </div>
                        <button type="submit" className="submit-button">Pay Now</button>
                    </form>
                </div>
            );
        } else if (method === 'Paytm') {
            content = (
                <div className="dummy-form">
                    <h3>Paytm Payment</h3>
                    <form className="dummy-payment-form" onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                            <label htmlFor="paytmNumber">Paytm Mobile Number:</label>
                            <input type="text" id="paytmNumber" name="paytmNumber" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paytmAmount">Amount to Pay:</label>
                            <input type="text" id="paytmAmount" name="paytmAmount" value={productDetails && productDetails.price} readOnly />
                        </div>
                        <button type="submit" className="submit-button">Pay Now</button>
                    </form>
                </div>
            );
        } else if (method === 'Credit Card') {
            content = (
                <div className="dummy-form">
                    <h3>Credit Card Payment</h3>
                    <form className="dummy-payment-form" onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                            <label htmlFor="ccNumber">Credit Card Number:</label>
                            <input type="text" id="ccNumber" name="ccNumber" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ccAmount">Amount to Pay:</label>
                            <input type="text" id="ccAmount" name="ccAmount" value={productDetails && productDetails.price} readOnly />
                        </div>
                        <button type="submit" className="submit-button">Pay Now</button>
                    </form>
                </div>
            );
        }

        setDummyPageContent(content);
    };

    const handlePlaceOrder = () => {
        setOrderConfirmed(true);
    };

    const amountToPay = productDetails ? productDetails.price - 20 : 0;

    return (
        <div className="form-container">
            {orderConfirmed ? ( 
                <ConfirmationPage />
            ) : !showPaymentOptions ? (
                <>
                    <h2 className="form-title">Purchase Details</h2>
                    {productDetails && (
                        <div className="bill-summary">
                            <h3>Bill Summary</h3>
                            <p>Product: {productDetails.title}</p>
                            <p>Quantity: {productDetails.qty}</p>
                            <p>Price per Item: ₹ {productDetails.price}</p>
                            <p>Sub-Total: ₹ {productDetails.sub_total}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="purchase-form">
                        <div className="form-group">
                            <label htmlFor="customerName">Customer Name:</label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerNumber">Customer Number:</label>
                            <input
                                type="text"
                                id="customerNumber"
                                name="customerNumber"
                                value={formData.customerNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="productName">Product Name:</label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>
                        <div className="form-group address-field">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Proceed to Payment
                        </button>
                    </form>
                </>
            ) : (
                <div className="payment-container">
                    <h2 className="form-title">Payment Method</h2>
                    {!showDummyPage ? (
                        <>
                            <div className="payment-method">
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Cash on Delivery"
                                        onChange={() => handlePayment('Cash on Delivery')}
                                    />
                                    ₹{productDetails && productDetails.price} Cash on Delivery
                                </label>
                            </div>
                            <div className="payment-method">
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Pay Online"
                                        onChange={() => handlePayment('Pay Online')}
                                    />
                                    Pay Online
                                </label>
                            </div>
                        </>
                    ) : (
                        <div className="payment-options">
                            {dummyPageContent}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
