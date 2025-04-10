import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to Hogwarts University</h1>} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;


