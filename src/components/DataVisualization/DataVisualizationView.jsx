import React, {useState} from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import DataFileInputFormulary from "./DataFileInputFormulary";
import DataFileFilteringFormulary from "./DataFileFilteringFormulary";
import DataChartContainer from "./DataChartContainer";

const DataVisualizationView = () => {
    const [headers, setHeaders] = useState([]);
    const [rows, setRows] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dataKey, setDataKey] = useState("Total");

    // Callback to receive parsed file data
    const handleParsedFile = (headers, rows) => {
        setHeaders(headers);
        setRows(rows);
    };

    const handleFilteredData = (filteredData, dataKey) => {
        setFilteredData(filteredData);
        setDataKey(dataKey);
    };

    return(
        <div>
            <NavigationBar/>
            <DataFileInputFormulary onParsedFile={handleParsedFile}/>
            <DataFileFilteringFormulary onFilteredData={handleFilteredData} headers={headers} rows={rows}/>
            <DataChartContainer filteredData={filteredData} selectedDataKey={dataKey}/>
        </div>
    );
}

export default DataVisualizationView;