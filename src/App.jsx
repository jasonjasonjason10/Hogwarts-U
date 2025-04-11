import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import FacultyList from "./public-pages/FacultyList";
import DepartmentList from "./public-pages/DepartmentList";
import DepartmentDetail from "./public-pages/DepartmentDetail";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1 className="magic-title">Welcome to Hogwarts University</h1>} />
       
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faculty" element={<FacultyList />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/:id" element={<DepartmentDetail />} />
      </Routes>
    </>
  );
}

export default App;
