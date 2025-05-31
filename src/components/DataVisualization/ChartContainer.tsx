import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import "../../styles/DataVisualization/DataChartContainer.css";

type DataChartContainerProps = {
  data:any[];
  xKey:string;
  yKey:string;
}

const DataChartContainer = ({data, xKey, yKey}:DataChartContainerProps) => {
  const width:number = window.innerWidth;
  const height:number = window.innerHeight;

  const actualXKey = "item";
  console.log(data, xKey, actualXKey);
  

  return(
    <BarChart className="chart-block" width={width*.6} height={height*.7} style={{marginLeft:20}} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={actualXKey} angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }}/>
      <YAxis/>
      <Tooltip />
      <Legend />
      <Bar dataKey={data[0]?.[yKey] !== undefined ? yKey : "total"} name={xKey} fill="#A2CADC" label={({ x, y, width, value }) => (<text x={x! + width! / 2} y={y! - 5} fill="#FFFFFF" textAnchor="middle" fontSize={14}>{value}</text>)}/>
    </BarChart>
  );
}

export default DataChartContainer;
