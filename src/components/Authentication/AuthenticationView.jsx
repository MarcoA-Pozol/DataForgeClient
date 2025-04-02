import React from "react";
import LoginView from "./Login/LoginView.jsx";
import RegisterView from "./Register/RegisterView.jsx";
import LogoutButton from "./LogoutButton.jsx";
import RefreshAccessTokenModule from './components/Authentication/JWTManagement/JWTRefresh.jsx';
import "../../styles/AuthenticationView.css";

const AuthenticationView = () => {

    return(
        <div className="authentication-view">
            <RefreshAccessTokenModule/>
            <LoginView/>
            <RegisterView/>
            <LogoutButton/>
        </div>
    );
}

export default AuthenticationView;