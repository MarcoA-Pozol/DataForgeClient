import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "../components/Application/HomeView";
import AuthenticationView from "../components/Authentication/AuthenticationView";
import PageNotFoundView from "../components/PageNotFoundView";
import DataVisualizationView from "../components/DataVisualization/BaseView";
import { AnimatePresence } from "framer-motion"; // Apply change between pages correctly

const AppRoutes = () => {
    return (
        <AnimatePresence>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeView/>}/>
                    <Route path="/datavisualization" element={<DataVisualizationView/>}/>
                    <Route path="/authentication" element={<AuthenticationView/>}/>
                    <Route path="*" element={<PageNotFoundView/>} />
                </Routes>
            </Router>
        </AnimatePresence>
    );
};

export default AppRoutes;