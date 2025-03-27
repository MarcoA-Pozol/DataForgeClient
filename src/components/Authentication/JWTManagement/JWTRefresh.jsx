import axios from "axios";

const RefreshAccessTokenModule = async () => {

    // Request a refreshed access token
    try {
        const response = axios.post('http://localhost:10200/api/token/refresh/', {
            refresh: localStorage.getItem('refreshToken'),
        });

        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.access)
        }
    } catch (error) {
        alert('Session expired. Please log in again.');
    }
}

export default RefreshAccessTokenModule;