import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/LogoutButton.css";
import axios from "axios";

const LogoutButton = () => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate=useNavigate();

    // Get current session refresh token (JWT)
    const refreshToken = sessionStorage.getItem("refreshToken");

    const handleLogout = async () => {
        try {
            const response = await axios.post("localhost:10200/authentication/logout/", {
                headers: {
                    Authorization: `bearer ${refreshToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 205){
                // Destroy session token
                sessionStorage.removeItem("refreshToken");
                navigate("/authentication");
            } else {
                setErrorMessage(`Impossible to close session.`)
            }
        } catch(error) {
            setErrorMessage(`Impossible to remove refresh token: ${error}`)
        }
    }

    return (
        <>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
            {errorMessage && <span>{errorMessage}</span>}
        </>
    );
}

export default LogoutButton;