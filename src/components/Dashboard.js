import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import AdminSettingsPage from './AdminSettingsPage';
import Tracking from './Tracking';
import Message from './Message';
import './Dashboard.css';
import './Sidebar.css';

const initialData = [
    { name: 'Jan', Sales: 4000, Profit: 2400 },
    { name: 'Feb', Sales: 3000, Profit: 1398 },
    { name: 'Mar', Sales: 2000, Profit: 9800 },
    { name: 'Apr', Sales: 2780, Profit: 3908 },
    { name: 'May', Sales: 1890, Profit: 4800 },
    { name: 'Jun', Sales: 2390, Profit: 3800 },
    { name: 'Jul', Sales: 3490, Profit: 4300 },
];

export default function Dashboard() {
    const [data, setData] = useState(initialData);
    const [currentSection, setCurrentSection] = useState('dashboard');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        setLoggedInUser(user);

        fetch('/api/customers')
            .then(response => response.json())
            .then(data => {
                setCustomerData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching customer data:', error);
                setLoading(false);
            });

        const timer = setInterval(() => {
            setData(prevData =>
                prevData.map(item => ({
                    ...item,
                    Sales: item.Sales + Math.floor(Math.random() * 500),
                    Profit: item.Profit + Math.floor(Math.random() * 500),
                }))
            );
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            handlePurchase(loggedInUser.email, 1);
        }
    }, [loggedInUser]);

    const handleNavigate = (section) => {
        if (section === 'logout') {
            localStorage.removeItem('loggedInUser');
            alert('Logged out');
            window.location.href = '/';
        } else {
            setCurrentSection(section);
        }
    };
  
    const handleDelete = () => {
        // Remove user data from localStorage
        localStorage.removeItem('loggedInUser');
        // Reload the page or update state to reflect the changes
        window.location.reload();
    };

    const handlePurchase = (email, quantity) => {
        setCustomerData(prevCustomerData =>
            prevCustomerData.map(cust =>
                cust.email === email
                    ? { ...cust, totalOrders: (cust.totalOrders || 0) + quantity }
                    : cust
            )
        );

        fetch(`/api/customers/${email}/orders`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update orders');
            }
            return response.json();
        })
        .then(updatedData => {
            console.log('Order updated successfully', updatedData);
        })
        .catch(error => {
            console.error('Error updating orders:', error);
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="layout">
            <div className="sidebar">
                <h2 className="sidebar-title">Admin Panel</h2>
                <ul className="sidebar-menu">
                    <li onClick={() => handleNavigate('dashboard')}>Dashboard</li>
                    <li onClick={() => handleNavigate('customer')}>Customer</li>
                    <li onClick={() => handleNavigate('admin-settings')}>Admin Settings</li>
                    <li onClick={() => handleNavigate('tracking')}>Tracking</li>
                    <li onClick={() => handleNavigate('messages')}>Messages</li>
                    <li onClick={() => handleNavigate('logout')}>Logout</li>
                </ul>
            </div>
            <div className="content">
                {currentSection === 'dashboard' && (
                    <>
                        <h2 style={styles.title}>Dashboard</h2>
                        <div style={styles.chartContainer}>
                            <LineChart
                                width={800}
                                height={400}
                                data={data}
                                style={styles.chart}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip contentStyle={styles.tooltip} />
                                <Legend wrapperStyle={styles.legend} />
                                <Line type="monotone" dataKey="Sales" stroke="#6699CC" strokeWidth={2} />
                                <Line type="monotone" dataKey="Profit" stroke="#FFB266" strokeWidth={2} />
                            </LineChart>
                        </div>
                    </>
                )}
                {currentSection === 'customer' && loggedInUser && (
                    <div>
                        <h2 style={styles.title}>Customer Details</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={loggedInUser.id}>
                                    <td>{loggedInUser.id}</td>
                                    <td>{loggedInUser.name}</td>
                                    <td>{loggedInUser.email}</td>
                                     <td>
                            <button style={styles.deleteButton} onClick={handleDelete}>Delete</button>
                        </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {currentSection === 'admin-settings' && <AdminSettingsPage />}
                {currentSection === 'tracking' && <Tracking />}
                {currentSection === 'messages' && <Message />} {/* Render Message component */}
            </div>
        </div>
    );
}

const styles = {
    title: {
        marginBottom: '20px',
        fontSize: '2rem',
        textAlign: 'center',
        color: 'black',
    },
    chartContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '90px',
    },
    chart: {
        backgroundColor: '#f0f4f8',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    },
    tooltip: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    legend: {
        fontSize: '14px',
        padding: '10px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '10px',
    },
};
