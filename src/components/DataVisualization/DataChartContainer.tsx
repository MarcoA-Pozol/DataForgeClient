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

  return(
    <BarChart className="chart-block" width={width*.6} height={height*.7} style={{marginLeft:20}} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} style={{fontSize:12}}/>
      <YAxis dataKey={yKey}/>
      <Tooltip />
      <Legend />
      <Bar dataKey="total" name={xKey} fill="#FFFFFF"/>
    </BarChart>
  );
}

export default DataChartContainer;
