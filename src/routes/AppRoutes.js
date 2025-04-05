import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DemoHomeView from "../components/Application/DemoHomeView.jsx";
import DemoDataManagementView from "../components/Application/DemoDataManagementView.jsx";
import AuthenticationView from "../components/Authentication/AuthenticationView.jsx";
import PageNotFoundView from "../components/PageNotFoundView.jsx";
import { AnimatePresence } from "framer-motion"; // Apply change between pages correctly

const AppRoutes = () => {
    return (
        <AnimatePresence>
            <Router>
                <Routes>
                    <Route path="/" element={<DemoHomeView/>}/>
                    <Route path="/authentication" element={<AuthenticationView/>}/>
                    <Route path="/datamanagement" element={<DemoDataManagementView/>}/>
                    <Route path="*" element={<PageNotFoundView/>} />
                </Routes>
            </Router>
        </AnimatePresence>
    );
};

export default AppRoutes;