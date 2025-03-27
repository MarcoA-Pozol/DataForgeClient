'use client'; // This forces Next.js to treat this as a client component

import React, { useState } from 'react';
import axios from 'axios';

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
            
            // Save tokens in LocalStorage or state management
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            alert('Valid credentials');
        } catch (error) {
            setErrorMessage('Invalid credentials');
        }
    };

    return (
        <div className='login-view'>
            <h2>Login</h2>

            <form className='login-formulary' onSubmit={handleAuthentication}>
                <label>
                    Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>

                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button type="submit">Login</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default LoginView;
