import { useEffect, useState } from "react";
import api from "../api/apiClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function EmissionChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    api.get("/routes/list")
      .then(res => {
        const formatted = res.data.map((r: any) => ({
          route: r.route_id,
          baseline: r.baselineIntensity,
          actual: r.actualIntensity,
        }));
        setData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Baseline vs Actual Intensity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="route" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="baseline" fill="#34d399" />
          <Bar dataKey="actual" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
