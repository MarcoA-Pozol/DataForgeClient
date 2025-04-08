import React, { useCallback } from "react";
import "../../styles/DataVisualization/DataFileFilteringFormulary.css";

const DataFileFilteringFormulary = ({onFilteredData, headers, rows}) =>{
    const filterData = useCallback((e) => {
        const filteredData = "";
        onFilteredData(filteredData);
    }, [onFilteredData, rows, headers]);

    return(
        <div className="filtering-container">
            <h3>2. Filter Data</h3>

            {headers.length > 0 ? (
                <div>
                    <label>Select a column:
                        <select onChange={filterData}>
                            {headers.map((header, i) => (
                                <option key={i}>{header}</option>
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