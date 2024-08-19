import React, { useEffect, useState } from 'react';
import './Message.css';

const Message = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(savedMessages);
    }, []);

    return (
        <div className="message-container">
            <h2>Customer Messages</h2>
            <ul className="message-list">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <li key={index} className="message-item">
                            <p><strong>Name:</strong> {msg.name}</p>
                            <p><strong>Email:</strong> {msg.email}</p>
                            <p><strong>Message:</strong> {msg.message}</p>
                        </li>
                    ))
                ) : (
                    <p>No messages available.</p>
                )}
            </ul>
        </div>
    );
};

export default Message;
