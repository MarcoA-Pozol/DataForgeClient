import React, { useCallback, useState } from "react";
import "../../styles/DataVisualization/DataFilteringForm.css";

const DataFilteringForm = ({onFilteredData, headers, rows, types}) =>{
    const [selectedVisualizationOptions, setSelectedVisualizationOptions] = useState([]);
    console.log(types)
    const handleColumnChange = (e) => {
        /* Obtain the selected column type */
        const type = e.target.value // [name:"string", age:"number", salary:"number", is_active:"boolean"]
        if (type === "string" || type === "boolean") {
            setSelectedVisualizationOptions(["Count per Value",]);
        } else if (type === "number") {
            setSelectedVisualizationOptions(["Count per Value", "Show Value per Given Index"]);
        }
        return null;
    };

    const handleColumnChanges = useCallback((e) => {
        // Obtain column throught the formulary selected option
        const column = e.target.value;

        // Filter how many times a value appears in the column
        const counts = {};
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
        onFilteredData(formatted, dataKey);
    }, [onFilteredData, rows, headers, types]);

    return(
        <div className="filtering-container">
            <h3>2. Filter Data</h3>

            {headers.length > 0 ? (
                <div>
                    <label>Select a column:
                        <select onChange={handleColumnChange}>
                            <option value="">-- Select --</option>
                            {Object.entries(types).map(([column, type]) => (
                                <option key={column} value={column}>
                                    {column} ({type})
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>Select a visualization mode:
                        <select>
                            <option value="">-- Select --</option>
                            {selectedVisualizationOptions.map((visualizationOption, i) => (
                                <option key={i} value={visualizationOption}>{visualizationOption}</option>
                            ))}
                        </select>
                    </label>
                    <p>Total Rows: {rows.length}</p>
                </div>
            ) : (
                <p>📂 Upload a file to begin filtering.</p>
            )}
        </div>
    );
}

export default DataFilteringForm;