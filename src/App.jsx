import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Welcome to Hogwarts University</h1>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
