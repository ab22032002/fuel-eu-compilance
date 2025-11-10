import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesPage from "./pages/RoutesPage";
import BankPage from "./pages/BankPage";
import PoolPage from "./pages/PoolPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/routes" />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/bank" element={<BankPage />} />
        <Route path="/pool" element={<PoolPage />} />
      </Routes>
    </Router>
  );
}

export default App;
