import axios from "axios";
import { useEffect } from "react";

const RefreshAccessTokenModule = () => {

    useEffect(() => {
        const refreshAccessToken = async() => {
            // Request a refreshed access token
            try {
                const response = await axios.post('http://localhost:10200/api/token/refresh/', {
                    refresh: localStorage.getItem('refreshToken'),
                });

                if (response.status === 200) {
                    localStorage.setItem('accessToken', response.data.access)
                }
            } catch (error) {
                alert('Session expired. Please log in again.');
            }
        };

        refreshAccessToken();
    }, []);

    return null;
};

export default RefreshAccessTokenModule;