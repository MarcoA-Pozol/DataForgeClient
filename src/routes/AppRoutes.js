import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationView from "../components/Authentication/AuthenticationView.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
				<Route path="/" element={<Home/>}/>
                <Route path="/authentication" element={<AuthenticationView/>}/>
                <Route path="/parsedata" element={<AuthenticationView/>}/>
				<Route path="/visualizedata" element={<AuthenticationView/>}/>
				<Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;