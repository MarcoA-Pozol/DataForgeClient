import {useState} from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import DataFileInputFormulary from "./DataFileInputFormulary";
import DataFilteringForm from "./DataFilteringForm";
import DataChartContainer from "./DataChartContainer";

const DataVisualizationView = () => {
    const [headers, setHeaders] = useState([]);
    const [types, setTypes] = useState({});
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [xKey, setXKey] = useState("X Label");
    const [yKey, setYKey] = useState("Y Label");

    // Callback to receive parsed file data
    const handleParsedFile = (headers, rows, types) => {
        setHeaders(headers);
        setRows(rows);
        setTypes(types);
    };

    const handleFilteredData = (data, xKey, yKey) => {
        setData(data);
        setXKey(xKey);
        setYKey(yKey)
    };

    return(
        <div>
            <NavigationBar/>
            <DataFileInputFormulary onParsedFile={handleParsedFile}/>
            <DataFilteringForm onFilteredData={handleFilteredData} headers={headers} rows={rows} types={types}/>
            <DataChartContainer data={data} xKey={xKey} yKey={yKey}/>
        </div>
    );
}

export default DataVisualizationView;