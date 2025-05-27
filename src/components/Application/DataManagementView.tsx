import NavigationBar from "./NavigationBar.tsx";
import PageTransition from "../Animations.tsx";

const DataManagementView = () => {
	return(
		<PageTransition>
			<NavigationBar/>
			<h2>Import, export, vizualize, parse and send data.</h2>
		</PageTransition>
	);
}

export default DataManagementView;