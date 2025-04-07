import React from "react";
import "../../styles/DataVisualization/DataFileFilteringFormulary.css";

const DataFileFilteringFormulary = ({headers, rows}) =>{
    return(
        <div className="filtering-container">
            <h3>2. Filter Data</h3>

            {headers.length > 0 ? (
                <div>
                    <label>Select a column:
                        <select>
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