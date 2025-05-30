import { useCallback, useState } from "react";
import "../../styles/DataVisualization/DataFilteringForm.css";

interface DataFilteringFormProps {
    onFilteredData: (filteredData: any[], xKey: string, yKey?: string) => void;
    headers: string[];
    rows: any[][];
    types: Record<string, "string" | "number" | "boolean">;
}

type VisualizationOption = "Count" | "Value per Index";

const DataFilteringForm = ({onFilteredData, headers, rows, types}:DataFilteringFormProps) =>{
    const [selectedVisualizationOptions, setSelectedVisualizationOptions] = useState<VisualizationOption[]>([]);
    const [column, setColumn] = useState("");

    const handleVisualizationMode = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        // Get choosen visualization mode
        const selectedVisualizationMode = e.target.value;

        // Validate selected mode
        if (selectedVisualizationMode === "Count") {
            // Filter how many times a value appears in the column
            const counts: Record<string, number> = {};
            rows.forEach((row) => {
                const value = row[headers.indexOf(column)];
                if (value) {
                counts[value] = (counts[value] || 0) + 1;
                }
            });
            // Get selected data key (column)
            const dataKey = column;
            // Format for Recharts (Final data state ready to be plotted on the chart)
            const formatted = Object.entries(counts).map(([item, total]) => ({ item, total }));
            console.log(`Formated:${formatted}`)
            onFilteredData(formatted, dataKey);
        } else if (selectedVisualizationMode === "Value per Index") {
            const comparative_index = "Airline"; // this could be dynamic later

            const colIndex = headers.indexOf(column);
            const compIndex = headers.indexOf(comparative_index);

            if (colIndex === -1 || compIndex === -1) return; // Do not filter until column and comparative index are selected

            const formatted = rows.map((row) => {
                const xLabel = row[compIndex];
                const yValue = row[colIndex];
                return {
                    [comparative_index]: xLabel,
                    [column]: isNaN(yValue) ? yValue : Number(yValue),
                };
            });

            const xKey = column; 
            const yKey = comparative_index;
            onFilteredData(formatted, xKey, yKey);
        }

    }, [onFilteredData, column, rows, headers]);

    const handleColumnChanges = ((e:React.ChangeEvent<HTMLSelectElement>) => {
        // Obtain column throught the formulary selected option
        let isNumber = true;
        let isBoolean = true;
        const selectedColumn = e.target.value;
        setColumn(selectedColumn);

        // Column index and value
        const columnIndex = headers.indexOf(selectedColumn);
        const columnValues = rows.map(row => row[columnIndex]);

        // Column type validation
        for (let val of columnValues) {
            const normalized = val?.toString().trim().toLowerCase();
    
            if (isNaN(Number(val))) isNumber = false;
            if (normalized !== "true" && normalized !== "false") isBoolean = false;
        }
    
        if (isBoolean) {
            types[column] = "boolean";
            setSelectedVisualizationOptions(["Count", "Value per Index"]);
        } else if (isNumber) {
            types[column] = "number";
            setSelectedVisualizationOptions(["Count", "Value per Index"]);
        } else {
            types[column] = "string";
            setSelectedVisualizationOptions(["Count"]);
        }
    });

    return(
        <div className="filtering-container">
            <h3>2. Filter Data</h3>

            {headers.length > 0 ? (
                <div>
                    <label>Select a column:
                        <select onChange={handleColumnChanges}>
                            <option value="">-- Select --</option>
                            {Object.entries(types).map(([column, type]) => (
                                <option key={column} value={column}>
                                    {column} ({type})
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>Aggregation func:
                        <select onChange={handleVisualizationMode} disabled={!column || selectedVisualizationOptions.length === 0}> {/* Prevent user from selecting a visualization mode before a column is selected */}
                            <option value="">-- Select --</option>
                            {selectedVisualizationOptions.map((visualizationOption, i) => (
                                <option key={i} value={visualizationOption}>{visualizationOption}</option>
                            ))}
                        </select>
                    </label>
                    <p>Total Rows: {rows.length}</p>
                </div>
            ) : (
                <p>📂 Upload a file to filter data.</p>
            )}
        </div>
    );
}

export default DataFilteringForm;