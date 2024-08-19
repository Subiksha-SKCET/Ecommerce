// src/components/CustomerPage.js
import React from 'react';

const CustomerPage = ({ loggedInUser, customerName }) => {
    if (!loggedInUser) return <div>No user logged in.</div>;

    const handleDelete = () => {
        localStorage.removeItem('loggedInUser');
        window.location.reload();
    };

    return (
        <div>
            <h2 style={styles.title}>Customer Details</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th> 
                        <th>Email</th>
                        <th>Action</th> 
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
    );
};

const styles = {
    title: {
        marginBottom: '20px',
        fontSize: '2rem',
        textAlign: 'center',
        color: 'black',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
    },
};

export default CustomerPage;
