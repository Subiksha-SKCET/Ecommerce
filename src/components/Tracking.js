import React, { useState } from 'react';
import './Tracking.css';
import PieChart from './PieChart'; // Import the PieChart component

function OrderDetails({ order, onBack }) {
    if (!order) return <div>Order not found</div>;

    return (
        <div className="order-details">
            <h3>Order ID: {order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Tracking Number: <a href={`https://trackingcarrier.com/${order.trackingNumber}`} target="_blank" rel="noopener noreferrer">{order.trackingNumber}</a></p>
            <p>Delivery Date: {order.deliveryDate}</p>
            <p>Items Ordered: {order.items}</p>
            <p>Total Amount: {order.totalAmount}</p>
            <button onClick={onBack}>Back to Orders</button>
        </div>
    );
}

export default function Tracking() {
    const [view, setView] = useState('orders'); 
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orders, setOrders] = useState([
        { id: 1, status: 'Shipped', trackingNumber: '123456', deliveryDate: '2024-08-12', items: 'Item 1, Item 2', totalAmount: '$100' },
        { id: 2, status: 'Pending', trackingNumber: '789012', deliveryDate: '2024-08-15', items: 'Item 3', totalAmount: '$50' },
    ]);
    const [newOrder, setNewOrder] = useState({
        id: orders.length + 1, 
        status: "",
        trackingNumber: "",
        deliveryDate: "",
        items: "",
        totalAmount: ""
    });

    const handleViewDetails = (id) => {
        setSelectedOrderId(id);
        setView('details');
    };

    const handleBack = () => {
        setView('orders');
    };

    const handleAddOrderView = () => {
        setView('add');
    };

    const handleAddOrder = () => {
        setOrders([...orders, newOrder]); 
        setNewOrder({
            id: orders.length + 1, 
            status: "",
            trackingNumber: "",
            deliveryDate: "",
            items: "",
            totalAmount: ""
        });
        setView('orders');
    };

    const handleViewPieChart = () => {
        setView('pieChart');
    };

    return (
        <div className="tracking">
            <h2>Order Tracking</h2>
            {view === 'orders' && (
                <div className="order-list">
                    <h3>Order List</h3>
                    <button onClick={handleAddOrderView}>Add New Order</button>
                    <button onClick={handleViewPieChart}>View Pie Chart</button>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Tracking Number</th>
                                <th>Delivery Date</th>
                                <th>Total Amount</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.status}</td>
                                    <td>{order.trackingNumber}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.totalAmount}</td>
                                    <td><button onClick={() => handleViewDetails(order.id)}>View Details</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {view === 'details' && selectedOrderId && (
                <OrderDetails order={orders.find(o => o.id === selectedOrderId)} onBack={handleBack} />
            )}
            {view === 'add' && (
                <div className="add-order">
                    <h3>Add New Order</h3>
                    <form>
                        <div>
                            <label>Status:</label>
                            <input type="text" value={newOrder.status} onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })} />
                        </div>
                        <div>
                            <label>Tracking Number:</label>
                            <input type="text" value={newOrder.trackingNumber} onChange={(e) => setNewOrder({ ...newOrder, trackingNumber: e.target.value })} />
                        </div>
                        <div>
                            <label>Delivery Date:</label>
                            <input type="date" value={newOrder.deliveryDate} onChange={(e) => setNewOrder({ ...newOrder, deliveryDate: e.target.value })} />
                        </div>
                        <div>
                            <label>Items Ordered:</label>
                            <input type="text" value={newOrder.items} onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })} />
                        </div>
                        <div>
                            <label>Total Amount:</label>
                            <input type="text" value={newOrder.totalAmount} onChange={(e) => setNewOrder({ ...newOrder, totalAmount: e.target.value })} />
                        </div>
                        <button type="button" onClick={handleAddOrder}>Add Order</button>
                        <button type="button" onClick={handleBack}>Cancel</button>
                    </form>
                </div>
            )}
            {view === 'pieChart' && (
                <div className="pie-chart-page">
                    <PieChart orders={orders} />
                    <button onClick={handleBack}>Back to Orders</button>
                </div>
            )}
        </div>
    );
}
