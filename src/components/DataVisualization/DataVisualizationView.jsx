import React from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import DataFileInputFormulary from "./DataFileInputFormulary";

const DataVisualizationView = () => {

    return(
        <div>
            <NavigationBar/>
            <DataFileInputFormulary/>
        </div>
    );
}

export default DataVisualizationView;