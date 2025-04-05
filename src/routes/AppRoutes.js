import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "../components/Application/HomeView.jsx";
import DataManagementView from "../components/Application/DataManagementView.jsx";
import AuthenticationView from "../components/Authentication/AuthenticationView.jsx";
import PageNotFoundView from "../components/PageNotFoundView.jsx";
import DataVisualizationView from "../components/DataVisualization/DataVisualizationView.jsx";
import { AnimatePresence } from "framer-motion"; // Apply change between pages correctly

const AppRoutes = () => {
    return (
        <AnimatePresence>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeView/>}/>
                    <Route path="/datavisualization" element={<DataVisualizationView/>}/>
                    <Route path="/authentication" element={<AuthenticationView/>}/>
                    <Route path="/datamanagement" element={<DataManagementView/>}/>
                    <Route path="*" element={<PageNotFoundView/>} />
                </Routes>
            </Router>
        </AnimatePresence>
    );
};

export default AppRoutes;