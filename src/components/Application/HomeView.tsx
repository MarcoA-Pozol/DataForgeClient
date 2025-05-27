import NavigationBar from "./NavigationBar.tsx";
import PageTransition from "../Animations.tsx"; // To wrap component inside the transition component
import "../../styles/HomeView.css";

const HomeView = () => {
	return(
		<PageTransition>
			<NavigationBar/>
			<h2>Welcome to DataForge!</h2>
		</PageTransition>
	);
}

export default HomeView;