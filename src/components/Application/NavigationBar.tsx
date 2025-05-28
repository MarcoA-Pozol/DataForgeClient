import { NavLink } from "react-router-dom";
// import LogoutButton from "../Authentication/LogoutButton.jsx";
import dataForgeLogo from "../../assets/dataforgelogo.png";
import "../../styles/NavigationBar.css";

const NavigationBar = () => {
	return (
		<nav className="navigation-bar">
			<NavLink to="/datavisualization" id="dataforge-logo-container" end className={({ isActive }) => isActive ? "active-link" : ""}>
				<img src={dataForgeLogo} alt="dataforge logo" id="dataforge-logo"></img>
				<h2 id="dataforge-title">DataForge</h2>
			</NavLink>
			{/*<NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}><h3>Home</h3></NavLink>*/}
			<NavLink to="/datavisualization" end className={({ isActive }) => isActive ? "active-link" : ""}><h3>Visualize</h3></NavLink>
			{/*<NavLink to="/dataimportexport" end className={({ isActive }) => isActive ? "active-link" : ""}><h3>Import & Export</h3></NavLink>
			<NavLink to="/datareporting" end className={({ isActive }) => isActive ? "active-link" : ""}><h3>Reporting</h3></NavLink>*/}
			{/*<LogoutButton/>*/}
		</nav>
	);
}			
		
export default NavigationBar;