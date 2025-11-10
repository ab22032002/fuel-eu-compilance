import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function CBChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get("/bank/list")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Compliance Bank Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount_gco2eq" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
