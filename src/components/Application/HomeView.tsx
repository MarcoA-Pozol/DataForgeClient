import NavigationBar from "./NavigationBar.tsx";
import PageTransition from "../Animations.tsx"; // To wrap component inside the transition component
import "../../styles/HomeView.css";

const HomeView = () => {
	return(
		<PageTransition>
			<NavigationBar/>
			<h2>Welcome to DataForge!</h2>
			<p>You can manage your data here!</p>
		</PageTransition>
	);
}

export default HomeView;