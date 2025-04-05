import React from "react";
import NavigationBar from "./NavigationBar.jsx";
import PageTransition from "../Animations.jsx"; // To wrap component inside the transition component

const HomeView = () => {
	return(
		<PageTransition>
			<NavigationBar/>
			<h2>Welcome to DataForge!</h2>
		</PageTransition>
	);
}

export default HomeView;