import React, { useState } from "react";
import './RegisterForm.css'; 

export default function RegisterForm() {
    const [isHovered, setIsHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    

    const validateUniqueCredentials = () => {
        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin123';

        if (email !== adminEmail) {
            return 'Invalid email address';
        }
        if (password !== adminPassword) {
            return 'Invalid password';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        
        const validationError = validateUniqueCredentials();
        if (validationError) {
            setError(validationError);
            return;
        }
        
        window.location.href = '/dashboard';
    };

    return (
        <div className="registerContainer">
            <form
                className="registerForm"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onSubmit={handleSubmit} 
            >
                <h2 className="registerTitle">Login</h2>
                <input
                    type="email"
                    className="registerInput"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className={`registerButton ${isHovered ? 'hover' : ''}`}
                >
                    Login
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}
