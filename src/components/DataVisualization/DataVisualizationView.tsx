import {useState} from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import DataFileInputFormulary from "./DataFileInputFormulary";
import DataFilteringForm from "./DataFilteringForm";
import DataChartContainer from "./DataChartContainer";


// Define allowed types for a cell
type Cell = string | number | boolean | null;

// Recharts-compatible object for plotting
interface ChartDataItem {
    [key: string]: string | number;
}

// Types map: column name to type (includes values typing)
type ColumnTypes = Record<string, "string" | "number" | "boolean">;

const DataVisualizationView = () => {
    const [headers, setHeaders] = useState<string[]>([]);
    const [types, setTypes] = useState<ColumnTypes>({});
    const [rows, setRows] = useState<Cell[][]>([]);
    const [data, setData] = useState<ChartDataItem[]>([]);
    const [xKey, setXKey] = useState<string>("X Label");
    const [yKey, setYKey] = useState<string>("Y Label");

    // Callback to receive parsed file data
    const handleParsedFile = (headers:string[], rows:Cell[][], types:ColumnTypes) => {
        setHeaders(headers);
        setRows(rows);
        setTypes(types);
    };

    const handleFilteredData = (data:ChartDataItem[], xKey:string, yKey?:string) => {
        setData(data);
        setXKey(xKey);
        if (yKey) setYKey(yKey);
    };

    return(
        <div>
            <NavigationBar/>
            <br></br>
            <div style={{display:"inline-flex", width:"100vw", alignItems:"center"}}>
                <div>
                    <DataFileInputFormulary onParsedFile={handleParsedFile}/>
                    <DataFilteringForm onFilteredData={handleFilteredData} headers={headers} rows={rows} types={types}/>
                </div>
                <DataChartContainer data={data} xKey={xKey} yKey={yKey}/>
            </div>
        </div>
    );
}

export default DataVisualizationView;