import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  TableContainer,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const AdminDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    //this is fetching the departments and the faculty
    const fetchData = async () => {
      try {
        const deptRes = await fetch(`${API_URL}/departments`);
        const facultyRes = await fetch(`${API_URL}/faculty`);
        const deptData = await deptRes.json();
        const facultyData = await facultyRes.json();
        setDepartments(deptData);
        setFaculty(facultyData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //This is my state for adding a new department
  const [newDept, setNewDept] = useState({
    name: "",
    description: "",
    banner_image: "",
    contact_email: "",
  });

  //This is my state for adding a new professor
  const [newProfessor, setNewProfessor] = useState({
    name: "",
    email: "",
    bio: "",
    profile_image: "",
    department_id: "",
  });

  //this will be my handler function for a new department
  const handleAddDepartment = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newDept),
      });

      const data = await res.json();
      if (res.ok) {
        setDepartments([...departments, data.department]);
        setNewDept({
          name: "",
          description: "",
          banner_image: "",
          contact_email: "",
        });
      } else {
        console.error("Failed to create department:", data.message);
      }
    } catch (err) {
      console.error("Error creating department:", err);
    }
  };

  //this will be my handler function for a new professor
  const handleAddProfessor = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/faculty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProfessor),
      });

      const data = await res.json();

      if (res.ok) {
        setFaculty([...faculty, data.faculty]);
        setNewProfessor({
          name: "",
          email: "",
          bio: "",
          profile_image: "",
          department_id: "",
        });
      } else {
        console.error("Failed to add professor:", data.message);
      }
    } catch (err) {
      console.error("Error adding professor:", err);
    }
  };

  //THis is my DELETE a proffesor function
  const handleDeleteProfessor = async (id) => {
    try {
      const res = await fetch(`${API_URL}/faculty/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.ok) {
        setFaculty(faculty.filter((prof) => prof.id !== id));
      } else {
        console.error("Failed to delete professor");
      }
    } catch (err) {
      console.error("Error deleting professor:", err);
    }
  };

  //This is my function to DELETE a department
  const handleDeleteDepartment = async (id) => {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setDepartments(departments.filter((dept) => dept.id !== id));
      } else {
        console.error("Failed to delete department:", data.message);
      }
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Departments</h2>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Contact Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell>{dept.name}</TableCell>
                    <TableCell>{dept.description}</TableCell>
                    <TableCell>{dept.contact_email}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteDepartment(dept.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <h3>Add New Department</h3>
          <form onSubmit={handleAddDepartment} style={{ marginBottom: "2rem" }}>
            <TextField
              label="Name"
              value={newDept.name}
              onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
              required
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={newDept.description}
              onChange={(e) =>
                setNewDept({ ...newDept, description: e.target.value })
              }
              fullWidth
              margin="dense"
            />
            <TextField
              label="Banner Image URL"
              value={newDept.banner_image}
              onChange={(e) =>
                setNewDept({ ...newDept, banner_image: e.target.value })
              }
              fullWidth
              margin="dense"
            />
            <TextField
              label="Contact Email"
              value={newDept.contact_email}
              onChange={(e) =>
                setNewDept({ ...newDept, contact_email: e.target.value })
              }
              type="email"
              fullWidth
              margin="dense"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
            >
              Add Department
            </Button>
          </form>

          <h2>Faculty</h2>
          <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Bio</TableCell>
                  <TableCell>Department ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {faculty.map((prof) => (
                  <TableRow key={prof.id}>
                    <TableCell>{prof.name}</TableCell>
                    <TableCell>{prof.email}</TableCell>
                    <TableCell>{prof.bio}</TableCell>
                    <TableCell>{prof.department_id}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteProfessor(prof.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* <h3>Add New Professor</h3>
          <form onSubmit={handleAddProfessor}>
            <input
              type="text"
              placeholder="Name"
              value={newProfessor.name}
              onChange={(e) =>
                setNewProfessor({ ...newProfessor, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newProfessor.email}
              onChange={(e) =>
                setNewProfessor({ ...newProfessor, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Bio"
              value={newProfessor.bio}
              onChange={(e) =>
                setNewProfessor({ ...newProfessor, bio: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Profile Image URL"
              value={newProfessor.profile_image}
              onChange={(e) =>
                setNewProfessor({
                  ...newProfessor,
                  profile_image: e.target.value,
                })
              }
            />
            <select
              value={newProfessor.department_id}
              onChange={(e) =>
                setNewProfessor({
                  ...newProfessor,
                  department_id: e.target.value,
                })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Professor</button>
          </form> */}
          <h3>Add New Professor</h3>
          <form onSubmit={handleAddProfessor} style={{ marginBottom: "2rem" }}>
            <TextField
              label="Name"
              value={newProfessor.name}
              onChange={(e) =>
                setNewProfessor({ ...newProfessor, name: e.target.value })
              }
              required
              fullWidth
              margin="dense"
            />
            <TextField
              label="Email"
              value={newProfessor.email}
              onChange={(e) =>
                setNewProfessor({ ...newProfessor, email: e.target.value })
              }
              type="email"
              fullWidth
              margin="dense"
            />
            <TextField
              label="Bio"
              value={newProfessor.bio}
              onChange={(e) =>
                setNewProfessor({ ...newProfessor, bio: e.target.value })
              }
              fullWidth
              margin="dense"
            />
            <TextField
              label="Profile Image URL"
              value={newProfessor.profile_image}
              onChange={(e) =>
                setNewProfessor({
                  ...newProfessor,
                  profile_image: e.target.value,
                })
              }
              fullWidth
              margin="dense"
            />
            <Select
              value={newProfessor.department_id}
              onChange={(e) =>
                setNewProfessor({
                  ...newProfessor,
                  department_id: e.target.value,
                })
              }
              displayEmpty
              fullWidth
              required
              margin="dense"
            >
              <MenuItem value="" disabled>
                Select Department
              </MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
            >
              Add Professor
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
