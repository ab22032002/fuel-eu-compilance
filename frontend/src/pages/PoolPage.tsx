import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function PoolPage() {
  const [pools, setPools] = useState<any[]>([]);
  const [year, setYear] = useState("");
  const [members, setMembers] = useState<string>("");

  const fetchPools = () => {
    api.get("/pool/list")
      .then(res => setPools(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchPools();
  }, []);

  const handleCreatePool = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/pool/create", {
        year: Number(year),
        members: members.split(",").map(m => m.trim()),
      });
      fetchPools();
      setYear(""); setMembers("");
      alert("✅ Pool created successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create pool");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Pools</h2>

      <form
        onSubmit={handleCreatePool}
        className="bg-white shadow rounded-lg p-4 flex flex-wrap gap-4 items-end"
      >
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
          <label className="block text-sm font-medium text-gray-600">Members (comma-separated)</label>
          <input
            className="border p-2 rounded w-80"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create Pool
        </button>
      </form>

      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Pool ID</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Members</th>
          </tr>
        </thead>
        <tbody>
          {pools.map((p, i) => (
            <tr key={i}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.year}</td>
              <td className="border p-2">{p.members?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
