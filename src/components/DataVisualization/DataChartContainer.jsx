// ExcelReader.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import "../../styles/DataVisualization/DataChartContainer.css";

const DataChartContainer = ({data, xKey, yKey}) => {
  return(
    <BarChart className="chart-block" width={1235} height={500} style={{marginTop:20}} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} style={{fontSize:16}}/>
      <YAxis dataKey={yKey}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="total" name={xKey} fill="rgb(100, 40, 200)"/>
    </BarChart>
  );
}

export default DataChartContainer;
