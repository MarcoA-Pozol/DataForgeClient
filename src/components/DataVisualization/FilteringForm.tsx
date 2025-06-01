import { useState } from "react";
import "../../styles/DataVisualization/DataFilteringForm.css";
interface FilteringFormProps {
    onFilteredData: (filteredData: any[], xKey: string, yKey?: string) => void;
    headers: string[];
    rows: any[][];
    xTypes: Record<string, "string" | "boolean">;
    yTypes: Record<number, "number">;
}

type VisualizationOption = "Count" | "Value per Index" | "Sum" | "Avg" | "Max" | "Min";

const FilteringForm = ({onFilteredData, headers, rows, xTypes, yTypes}:FilteringFormProps) =>{
    const [selectedVisualizationOptions, setSelectedVisualizationOptions] = useState<VisualizationOption[]>([]);
    const [column, setColumn] = useState<string>("");
    const [yIndex, setYIndex] = useState<string>("");

    const handleVisualizationMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // Get choosen visualization mode
        const selectedVisualizationMode = e.target.value;

        if (!column || !yIndex) return;

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
            const xKey = column;
            // Format for Recharts (Final data state ready to be plotted on the chart)
            const data = Object.entries(counts).map(([item, total]) => ({ item, total }));
            console.log(`Formated:${data}`)
            onFilteredData(data, xKey);
        } else if (selectedVisualizationMode === "Value per Index") {
            // Assume the xLabel is some identifier (use row index if no 'ID' or 'Airline' exists)
            const colIndex = headers.indexOf(column);
            const idColumn = headers.includes("ID") ? "ID" : headers.includes("Airline") ? "Airline" : null;

            const data = rows.map((row, i) => {
                const xLabel = idColumn ? row[headers.indexOf(idColumn)] : `Row ${i + 1}`;
                const yValue = row[colIndex];
                return {
                    label: xLabel,
                    value: isNaN(yValue) ? yValue : Number(yValue),
                };
            });

            const xKey = column;   // X-axis = identifier
            const yKey = "value";   // Y-axis = numeric value
            onFilteredData(data, xKey, yKey);
        } else if (["Sum", "Avg", "Min", "Max"].includes(selectedVisualizationMode)) {
            const groupByKey = column;
            const groupByIndex = headers.indexOf(groupByKey);
            const yKeyIndex = headers.indexOf(yIndex);
        
            const groupedValues: Record<string, number[]> = {};
        
            // Group values
            rows.forEach(row => {
                const key = row[groupByIndex];
                const val = parseFloat(row[yKeyIndex]);
        
                if (!isNaN(val)) {
                    if (!groupedValues[key]) groupedValues[key] = [];
                    groupedValues[key].push(val);
                }
            });
        
            const data = Object.entries(groupedValues).map(([group, values]) => {
                let aggregated = 0;
        
                switch (selectedVisualizationMode) {
                    case "Sum":
                        aggregated = values.reduce((sum, v) => sum + v, 0);
                        break;
                    case "Avg":
                        aggregated = values.reduce((sum, v) => sum + v, 0) / values.length;
                        break;
                    case "Min":
                        aggregated = Math.min(...values);
                        break;
                    case "Max":
                        aggregated = Math.max(...values);
                        break;
                }
        
                return { item: group, total: aggregated };
            });
        
            onFilteredData(data, column, "total");
        }
    };

    const handleXIndexChange = ((e:React.ChangeEvent<HTMLSelectElement>) => {
        // Obtain column throught the formulary selected option
        let isBoolean = true;
        const selectedColumn = e.target.value;
        setColumn(selectedColumn);

        // Column index and value
        const columnIndex = headers.indexOf(selectedColumn);
        const columnValues = rows.map(row => row[columnIndex]);

        // Column type validation
        for (let val of columnValues) {
            const normalized = val?.toString().trim().toLowerCase();
    
            if (normalized !== "true" && normalized !== "false") isBoolean = false;
        }
    
        if (isBoolean || xTypes[column] === "string") {
            const visualizationOptions: VisualizationOption[] = ["Count", "Value per Index"];
            setSelectedVisualizationOptions(["Count", "Value per Index"]);
            if (yIndex) visualizationOptions.push("Sum", "Avg", "Max", "Min");
            setSelectedVisualizationOptions(visualizationOptions);
        } 
        else {
            xTypes[column] = "string";
            setSelectedVisualizationOptions(["Count"]);
        }
    });

    const handleYIndexChange = ((e:React.ChangeEvent<HTMLSelectElement>) => {
        const selectedYIndex = e.target.value;
        setYIndex(selectedYIndex);
    });

    return(
        <div className="filtering-container">
            <h3>2. Filter Data</h3>

            {headers.length > 0 ? (
                <div>
                    <label>X Index:
                        <select onChange={handleXIndexChange}>
                            <option value="">-- Select --</option>
                            {Object.entries(xTypes).map(([column, type]) => (
                                <option key={column} value={column}>
                                    {column} ({type})
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>Y Index:
                        <select onChange={handleYIndexChange}>
                            <option value="">-- Select --</option>
                            {Object.entries(yTypes).map(([column, type]) => (
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

export default FilteringForm;