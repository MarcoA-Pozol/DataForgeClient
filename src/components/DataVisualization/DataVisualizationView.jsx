import React, {useState} from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import DataFileInputFormulary from "./DataFileInputFormulary";
import DataFileFilteringFormulary from "./DataFileFilteringFormulary";
import DataChartContainer from "./DataChartContainer";

const DataVisualizationView = () => {
    const [fileHeaders, setFileHeaders] = useState([]);
    const [fileRows, setFileRows] = useState([]);

    // Callback to receive parsed file data
    const handleParsedFile = (headers, rows) => {
        setFileHeaders(headers);
        setFileRows(rows);
        console.log(fileHeaders);
        console.log(fileRows);
    };

    return(
        <div>
            <NavigationBar/>
            <DataFileInputFormulary onParsedFile={handleParsedFile}/>
            <DataFileFilteringFormulary headers={fileHeaders} rows={fileRows}/>
            <DataChartContainer/>
        </div>
    );
}

export default DataVisualizationView;