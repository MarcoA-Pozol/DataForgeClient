import React, { useCallback, useState } from "react";
import "../../styles/DataVisualization/DataFilteringForm.css";

const DataFilteringForm = ({onFilteredData, headers, rows}) =>{

    const handleColumnChange = useCallback((e) => {
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

export default DataFilteringForm;