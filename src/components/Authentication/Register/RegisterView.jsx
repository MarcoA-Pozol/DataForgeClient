"use client"; // This forces Next.js to treat this as a client component

import React, { useState } from "react";
import axios from "axios";
import "../../../styles/RegisterView.css";

const RegisterView = () => {
    // User's formulary data
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("");
    const [profilePicture, setProfilePicture] = useState("")
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    // Message for invalid formulary data or an error ocurred
    const [errorMessage, setErrorMessage] = useState("");

    const handleRegistering = async (event) => {
        event.preventDefault(); // Prevent page refresh on form submission

        try {
            // Request for user creation
            const response = await axios.post('http://localhost:10200/authentication/register/', {
                username, 
                email,
                country,
                profilePicture,
                password,
            });

            // If user is created, obtain a JWT for authentication
            if (response.status === 201) {
                // Fetch for a JWT
                const response_token = await axios.post('https://localhost:10200/api/token/', {
                    username,
                    password
                }); 

                if (response_token.status === 200) {
                    // Save tokens in LocalStorage or state management
                    localStorage.setItem('accessToken', response_token.data.access);
                    localStorage.setItem('refreshToken', response_token.data.refresh);
                    alert('Valid credentials');
                } else {
                    setErrorMessage("Impossible to authenticate the new user.");
                }
            } else {
                setErrorMessage('It was impossible to create a new user account with the provided data.', response.status)
            }
        } catch (error) {
            setErrorMessage('An error ocurred during account creation.');
        }
    };

    return (
        <div className='register-view'>
            <div className="blobs">
                <div className="blob"></div>
                <div className="blob"></div>
                <div className="blob"></div>
            </div>

            <form className='register-formulary' onSubmit={handleRegistering}>
                <h2>Register</h2>

                <label>
                    Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </label>

                <label>
                    Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <label>
                    Country: <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </label>

                <label>
                    Profile Picture: <input type="text" value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} required />
                </label>

                <label>
                    Repeat Password: <input type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />
                </label>

                <label>
                    Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button type="submit">Register</button>

                <span id="existing-account-button">I already have an account</span>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default RegisterView;
