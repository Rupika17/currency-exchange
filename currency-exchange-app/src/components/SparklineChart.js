import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const SparklineChart = ({ rates }) => {
  return (
    <LineChart width={600} height={200} data={rates}>
      <XAxis dataKey="date" type="category" />
      <YAxis type="number" domain={["auto", "auto"]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line type="monotone" dataKey="rate" stroke="#8884d8" />
    </LineChart>
  );
};

export default SparklineChart;
