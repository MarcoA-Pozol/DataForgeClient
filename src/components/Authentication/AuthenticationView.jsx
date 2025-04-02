import React from "react";
import LoginView from "./Login/LoginView.jsx";
import RegisterView from "./Register/RegisterView.jsx";
import "../../styles/AuthenticationView.css";

const AuthenticationView = () => {

    return(
        <div className="authentication-view">
            <LoginView/>
            <RegisterView/>
        </div>
    );
}

export default AuthenticationView;