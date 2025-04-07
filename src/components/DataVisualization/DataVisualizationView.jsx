import React from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import DataFileInputFormulary from "./DataFileInputFormulary";
import DataFileFilteringFormulary from "./DataFileFilteringFormulary";

const DataVisualizationView = () => {

    return(
        <div>
            <NavigationBar/>
            <DataFileInputFormulary/>
            <DataFileFilteringFormulary/>
        </div>
    );
}

export default DataVisualizationView;