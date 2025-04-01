"use client"; // This forces Next.js to treat this as a client component

import React, { useState } from "react";
import axios from "axios";
import "../../../styles/LoginView.css";

const LoginView = () => {
    // User's formulary data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAuthentication = async (event) => {
        event.preventDefault(); // Prevent page refresh on form submission

        try {
            // Request for JWT token
            const response = await axios.post('http://localhost:10200/api/token/', {
                username, // Body
                password, // Body
            });

            if (response.status === 200) {
                // Save tokens in LocalStorage or state management
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                alert('Valid credentials');
            } else {
                setErrorMessage('Invalid credentials', response.status)
            }
        } catch (error) {
            setErrorMessage('An error ocurred during user credentials validation.');
        }
    };

    return (
        <div className='login-view'>
            <div className="blobs">
                <div className="blob"></div>
                <div className="blob"></div>
                <div className="blob"></div>
            </div>

            <form className='login-formulary' onSubmit={handleAuthentication}>
                <h2>Login</h2>

                <label>
                    Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>

                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button type="submit">Login</button>

                <span>I do not have an account yet</span>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default LoginView;
