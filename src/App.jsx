import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import FacultyList from "./public-pages/FacultyList";
import DepartmentList from "./public-pages/DepartmentList";
import DepartmentDetail from "./public-pages/DepartmentDetail";
import "./index.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ position: "relative", height: "100vh" }}>
              <h1 className="magic-title">Welcome to Hogwarts University</h1>
              <img
                src="/src/assets/harry.png"
                alt="Harry flying"
                className="harry-fly"
              />
            </div>
          }
        />
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
