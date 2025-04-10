import React, {useState} from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import DataFileInputFormulary from "./DataFileInputFormulary";
import DataFilteringForm from "./DataFilteringForm";
import DataChartContainer from "./DataChartContainer";

const DataVisualizationView = () => {
    const [headers, setHeaders] = useState([]);
    const [types, setTypes] = useState({});
    const [rows, setRows] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [dataKey, setDataKey] = useState("Total");

    // Callback to receive parsed file data
    const handleParsedFile = (headers, rows, types) => {
        setHeaders(headers);
        setRows(rows);
        setTypes(types);
    };

    const handleFilteredData = (filteredData, dataKey) => {
        setFilteredData(filteredData);
        setDataKey(dataKey);
    };

    return(
        <div>
            <NavigationBar/>
            <DataFileInputFormulary onParsedFile={handleParsedFile}/>
            <DataFilteringForm onFilteredData={handleFilteredData} headers={headers} rows={rows} types={types}/>
            <DataChartContainer filteredData={filteredData} selectedDataKey={dataKey}/>
        </div>
    );
}

export default DataVisualizationView;