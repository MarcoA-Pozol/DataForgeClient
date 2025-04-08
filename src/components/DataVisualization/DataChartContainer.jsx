// ExcelReader.jsx
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function ExcelReader() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (jsonData.length > 0) {
        const cols = Object.keys(jsonData[0]);
        setColumns(cols);
        setData(jsonData);
      }
    };

    reader.readAsBinaryString(file);
  };

  // 🔥 Prepare chart data (inside the component)
  const chartData = data.map((row) => ({
    item: row.item,
    total: row.price * row.quantity,
  }));

  return (
    <div className="p-4">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {data.length > 0 && (
        <>
          <h2 className="text-xl mt-6 mb-2">Preview JSON</h2>
          <pre className="text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify({ columns, data }, null, 2)}
          </pre>

          <h2 className="text-xl mt-6 mb-2">Bar Chart: Total (price × quantity)</h2>
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="item" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </>
      )}
    </div>
  );
}
