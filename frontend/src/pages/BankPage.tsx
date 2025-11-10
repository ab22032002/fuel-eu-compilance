import { useEffect, useState } from "react";
import api from "../api/apiClient";
import CBChart from "../components/CBChart";
import EmissionChart from "../components/EmissionChart";

export default function BankPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [shipId, setShipId] = useState("");
  const [year, setYear] = useState("");
  const [actualIntensity, setActualIntensity] = useState("");
  const [fuelConsumption, setFuelConsumption] = useState("");

  const fetchData = () => {
    api.get("/bank/list")
      .then(res => setEntries(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCB = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/cb/calculate", {
        ship_id: shipId,
        year: Number(year),
        actualIntensity: Number(actualIntensity),
        fuelConsumption: Number(fuelConsumption),
      });
      fetchData(); // refresh data
      setShipId(""); setYear(""); setActualIntensity(""); setFuelConsumption("");
      alert("✅ CB calculated and stored successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add CB entry");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold mb-2">Compliance Bank</h2>

      {/* Add CB Form */}
      <form
        onSubmit={handleAddCB}
        className="bg-white shadow rounded-lg p-4 flex flex-wrap gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">Ship ID</label>
          <input
            className="border p-2 rounded w-40"
            value={shipId}
            onChange={(e) => setShipId(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Year</label>
          <input
            type="number"
            className="border p-2 rounded w-24"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Actual Intensity</label>
          <input
            type="number"
            className="border p-2 rounded w-32"
            value={actualIntensity}
            onChange={(e) => setActualIntensity(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Fuel Consumption</label>
          <input
            type="number"
            className="border p-2 rounded w-32"
            value={fuelConsumption}
            onChange={(e) => setFuelConsumption(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Entry
        </button>
      </form>

      {/* Bank Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Ship ID</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Balance (gCO₂eq)</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i}>
                <td className="border p-2">{e.ship_id}</td>
                <td className="border p-2">{e.year}</td>
                <td className="border p-2 text-right">
                  {e.amount_gco2eq.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CBChart />
        <EmissionChart />
      </div>
    </div>
  );
}
