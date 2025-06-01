/*
    Component workflow:
    1. FileInputFormulary: User drops or loads of a xlsx, csv or json file.
    2. BaseView: Store file data like rows, headers and column types.
    3. FilteringForm: User filters data selecting header to group data by.
    4. BaseView: Store filtered data including data, xKey abd yKey.
    5. ChartContainer: Renders filtered data as a chart.
*/

import {useState} from "react";
import NavigationBar from "../Application/NavigationBar";
import "../../styles/DataVisualization/DataVisualizationView.css";
import FileInputForm from "./FileInputForm";
import FilteringForm from "./FilteringForm";
import ChartContainer from "./ChartContainer";


// Define allowed types for a cell
type Cell = string | number | boolean | null;

// Recharts-compatible object for plotting
interface ChartDataItem {
    [key: string]: string | number;
}

// Types map: column name to type (includes values typing)
type XColumnTypes = Record<string, "string" | "boolean">;
type YColumnTypes = Record<number, "number">;

const BaseView = () => {
    // States to manage raw uploaded file
    const [headers, setHeaders] = useState<string[]>([]);
    const [rows, setRows] = useState<Cell[][]>([]);
    const [xTypes, setXTypes] = useState<XColumnTypes>({});
    const [yTypes, setYTypes] = useState<YColumnTypes>({});

    // States for filtered/visualized data
    const [data, setData] = useState<ChartDataItem[]>([]);
    const [xKey, setXKey] = useState<string>("X Label");
    const [yKey, setYKey] = useState<string>("Y Label");

    // Callback: After file upload
    const handleParsedFile = (headers:string[], rows:Cell[][], xTypes:XColumnTypes, yTypes:YColumnTypes) => {
        /*
            Used as callback function is sent to FileInputForm to set headers, rows and types after file upload.
            Setted values are reflected in BaseView component to be used in data filtering stage.

            Args:
            - headers (string[]): Column names obtained from parsed file, like id, name, createdAt, country, gender, etc.
            - rows (Cell[][]): Rows of data matching headers (1, Petter, 19-06-2025, USA, Male).
            - xTypes (XColumnTypes) : Column/headers values types for xIndex like string and boolean.
            - yTypes (YColumnTypes) : Values types for yIndex like number.
        */ 
        setHeaders(headers);
        setRows(rows);
        setXTypes(xTypes);
        setYTypes(yTypes);
    };
	
	// Callback: After file clean
	const handleCleanedFile = () => {
		/*
			Set headers, rows and types to empty lists or objects after cleaning a file on FileInput formulary.
			Cleaned data is reflected on the next componets like ChartContainer and FilteringForm as no values provided because of not loaded file.
			
			Args:
			- none
		*/
		setHeaders([]);
		setRows([]);
		setXTypes({});
        setXTypes
        setData([]);
        setXKey("X Label");
        setYKey("Y Label");
	};

    // Callback to receive filtered data
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
                    <FileInputForm onParsedFile={handleParsedFile} onCleanedFile={handleCleanedFile}/>
                    <FilteringForm onFilteredData={handleFilteredData} headers={headers} rows={rows} xTypes={xTypes} yTypes={yTypes}/>
                </div>
                <ChartContainer data={data} xKey={xKey} yKey={yKey}/>
            </div>
        </div>
    );
}

export default BaseView;