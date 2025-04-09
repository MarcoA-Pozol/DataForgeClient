// ExcelReader.jsx
import React, { useCallback, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import "../../styles/DataVisualization/DataChartContainer.css";

const DataChartContainer = ({filteredData, selectedDataKey}) => {
  const showChart = useCallback((e) => {
    filteredData = "120";
    selectedDataKey = "Juan";
  }, [filteredData])

  return(
    <BarChart className="chart-block" width={1235} height={550} data={filteredData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="item" angle={-45} textAnchor="end" height={100} style={{fontSize:16}}/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={selectedDataKey} fill="rgb(100, 40, 200)" />
    </BarChart>
  );
}

export default DataChartContainer;
