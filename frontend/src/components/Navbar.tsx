import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold tracking-wide">⚓ Fuel EU Compliance</h1>
      <div className="flex space-x-6">
        <Link to="/routes" className="hover:text-blue-400">Routes</Link>
        <Link to="/bank" className="hover:text-blue-400">Compliance Bank</Link>
        <Link to="/pool" className="hover:text-blue-400">Pools</Link>
      </div>
    </nav>
  );
}
