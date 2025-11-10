import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    api.get("/routes/list")
      .then(res => setRoutes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Registered Routes</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Route ID</th>
            <th className="border p-2">Ship</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Is Baseline</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r, i) => (
            <tr key={i}>
              <td className="border p-2">{r.route_id}</td>
              <td className="border p-2">{r.ship_id}</td>
              <td className="border p-2">{r.year}</td>
              <td className="border p-2">{r.is_baseline ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
