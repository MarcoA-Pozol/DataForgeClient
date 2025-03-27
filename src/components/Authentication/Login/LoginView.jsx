import React from 'react';
import axios from 'axios';

const LoginView = async(username, password) => {

    try{
        // Request for JWT obtention
        const response = await axios.post('http://localhost:10200/api/token/', {
            username, // Body
            password, // Body
        });

        // Evaluate response
        if (response.status === 200) {
            // Save tokens in LocalStorage or a state management library
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            alert('Valid credentials');
        }
    } catch (error) {
        alert('Invalid credentials');
    }

    return (
        <>
        
        </>
    );
}

export default LoginView;