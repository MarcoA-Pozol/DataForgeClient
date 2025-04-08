// ExcelReader.jsx
import React, { useCallback, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const DataChartContainer = ({filteredData}) => {
  const showChart = useCallback((e) => {
    filteredData = "120";
  }, [filteredData])

  return(
    <BarChart width={500} height={300} data={filteredData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="item" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="#82ca9d" />
    </BarChart>
  );
}

export default DataChartContainer;
