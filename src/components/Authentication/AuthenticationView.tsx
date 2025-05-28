import {useState} from "react";
import LoginView from "./LoginView.tsx";
import RegisterView from "./RegisterView.tsx";
// import JWTRefresh from "./JWTRefresh.tsx";
import PageTransition from "../Animations.tsx";
import "../../styles/AuthenticationView.css";

const AuthenticationView = () => {
    const [isLoginVisible, setIsLoginVisible] = useState<boolean>(true);

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