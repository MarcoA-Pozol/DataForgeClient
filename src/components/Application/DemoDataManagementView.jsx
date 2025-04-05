import React from "react";
import NavigationBar from "./NavigationBar.jsx";
import PageTransition from "../Animations.jsx";

const DataManagementView = () => {
	return(
		<PageTransition>
			<NavigationBar/>
			<h2>Import, export, vizualize, parse and send data.</h2>
		</PageTransition>
	);
}

export default DataManagementView;