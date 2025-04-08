import React, { useCallback, useState } from "react";
import "../../styles/DataVisualization/DataFileFilteringFormulary.css";

const DataFileFilteringFormulary = ({onFilteredData, headers, rows}) =>{
    const [selectedColumn, setSelectedColumn] = useState("");

    const handleColumnChange = useCallback((e) => {
        const column = e.target.value;
        setSelectedColumn(column);

        // Example filtering: count how many times each value appears in that column
        const counts = {};
        rows.forEach((row) => {
            const value = row[headers.indexOf(column)];
            if (value) {
            counts[value] = (counts[value] || 0) + 1;
            }
        });

        // Format for Recharts
        const formatted = Object.entries(counts).map(([item, total]) => ({ item, total }));
        onFilteredData(formatted);
    }, [onFilteredData, rows, headers]);

    return(
        <div className="filtering-container">
            <h3>2. Filter Data</h3>

            {headers.length > 0 ? (
                <div>
                    <label>Select a column:
                        <select onChange={handleColumnChange}>
                            <option value="">-- Select --</option>
                            {headers.map((header, i) => (
                                <option key={i} value={header}>{header}</option>
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

export default DataFileFilteringFormulary;