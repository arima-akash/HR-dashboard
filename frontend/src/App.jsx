import { Routes,Route } from "react-router-dom";
import HRLogin from "./pages/HRLogin";
import HRDashboard from "./pages/HRDashboard";
import CandidateLogin from "./pages/CandidateLogin";
import Home from "./pages/Home";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateApply from "./pages/CandidateApply";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hr/login" element={<HRLogin />} />
      <Route path="/candidate/login" element={<CandidateLogin />} />
      <Route path="/hr/dashboard" element={<HRDashboard />} />
      <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      <Route path="/apply" element={<CandidateApply />} />
    </Routes>
  );
}

export default App;