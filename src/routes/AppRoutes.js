import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthenticationView from "../components/Authentication/AuthenticationView.jsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/authentication" element={<AuthenticationView />}/>
            </Routes>
        </Router>
    );
};

export default AppRoutes;