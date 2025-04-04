import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../Authentication/LogoutButton.jsx";
import "../../styles/NavigationBar.css";

const NavigationBar = () => {
	return (
		<nav className="navigation-bar">
			<Link to="/"><h3>Home</h3></Link>
			<Link to="/datamanagement"><h3>Data</h3></Link>
			<LogoutButton/>
		</nav>
	);
}			
		
export default NavigationBar;