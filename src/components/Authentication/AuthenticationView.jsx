import React, {useState} from "react";
import LoginView from "./LoginView.jsx";
import RegisterView from "./RegisterView.jsx";
// import JWTRefresh from "./JWTRefresh.jsx";
import PageTransition from "../Animations.jsx";
import "../../styles/AuthenticationView.css";

const AuthenticationView = () => {
    const [isLoginVisible, setIsLoginVisible] = useState(true);

    const toggleForm = () => {
        /*Toggle between login and Register formularies*/
        setIsLoginVisible((prev) => !prev);
    };

    return(
        <PageTransition>
            <div className="authentication-view">
                {isLoginVisible ? (
                    <>
                        <LoginView/>
                        <br></br>
                        <span id="no-account-button" onClick={toggleForm}>I do not have an account yet</span>
                    </>
                    
                ): (
                    <>
                        <RegisterView/>
                        <br></br>
                        <span id="existing-account-button" onClick={toggleForm}>I already have an account</span>
                    </>
                )}
                {/*<JWTRefresh/>*/}
            </div>
        </PageTransition>
    );
}

export default AuthenticationView;