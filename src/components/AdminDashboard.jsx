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
  const [currentlyEditingDeptId, setCurrentlyEditingDeptId] = useState(null);
  const [currentlyEditingProfId, setCurrentlyEditingProfId] = useState(null);

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

  useEffect(() => {
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

  //This is defining my state for editing departments
  const [editDeptForm, setEditDeptForm] = useState({
    name: "",
    description: "",
    banner_image: "",
    contact_email: "",
  });

  //This is defining my state for editing faculty
  const [editProfForm, setEditProfForm] = useState({
    name: "",
    email: "",
    bio: "",
    profile_image: "",
    department_id: "",
  });

  //handler to edit departments???
  const startEditingDepartment = (dept) => {
    setCurrentlyEditingDeptId(dept.id);
    setEditDeptForm({
      name: dept.name,
      description: dept.description,
      banner_image: dept.banner_image,
      contact_email: dept.contact_email,
    });
  };

  //handler to edit faculty??
  const startEditingProfessor = (prof) => {
    setCurrentlyEditingProfId(prof.id);
    setEditProfForm({
      name: prof.name,
      email: prof.email,
      bio: prof.bio,
      profile_image: prof.profile_image,
      department_id: prof.department_id,
    });
  };

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
        await fetchData();
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
        await fetchData();
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
    const confirmed = window.confirm(
      "Are you sure you want to delete this professor?"
    );
    if (!confirmed) return;

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
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (!confirmed) return;

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

  //For Editing department? Im so lost now.
  const handleUpdateDepartment = async (id) => {
    try {
      const res = await fetch(`${API_URL}/departments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editDeptForm),
      });

      if (res.ok) {
        setCurrentlyEditingDeptId(null);
        await fetchData();
      } else {
        console.error("Failed to update department");
      }
    } catch (err) {
      console.error("Error updating department:", err);
    }
  };

  //For Editing faculty??
  const handleUpdateProfessor = async (id) => {
    try {
      const res = await fetch(`${API_URL}/faculty/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editProfForm),
      });

      if (res.ok) {
        setCurrentlyEditingProfId(null);
        await fetchData(); // refresh
      } else {
        console.error("Failed to update professor");
      }
    } catch (err) {
      console.error("Error updating professor:", err);
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
                    {currentlyEditingDeptId === dept.id ? (
                      <>
                        <TableCell>
                          <TextField
                            value={editDeptForm.name}
                            onChange={(e) =>
                              setEditDeptForm({
                                ...editDeptForm,
                                name: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={editDeptForm.description}
                            onChange={(e) =>
                              setEditDeptForm({
                                ...editDeptForm,
                                description: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={editDeptForm.contact_email}
                            onChange={(e) =>
                              setEditDeptForm({
                                ...editDeptForm,
                                contact_email: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleUpdateDepartment(dept.id)}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setCurrentlyEditingDeptId(null)}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={editDeptForm.banner_image}
                            onChange={(e) =>
                              setEditDeptForm({
                                ...editDeptForm,
                                banner_image: e.target.value,
                              })
                            }
                            label="Banner Image URL"
                            fullWidth
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{dept.name}</TableCell>
                        <TableCell>{dept.description}</TableCell>
                        <TableCell>{dept.contact_email}</TableCell>
                        <TableCell>
                          <Button onClick={() => startEditingDepartment(dept)}>
                            Edit
                          </Button>
                          <Button
                            color="error"
                            onClick={() => handleDeleteDepartment(dept.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
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
                    {currentlyEditingProfId === prof.id ? (
                      <>
                        <TableCell>
                          <TextField
                            value={editProfForm.name}
                            onChange={(e) =>
                              setEditProfForm({
                                ...editProfForm,
                                name: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={editProfForm.email}
                            onChange={(e) =>
                              setEditProfForm({
                                ...editProfForm,
                                email: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={editProfForm.bio}
                            onChange={(e) =>
                              setEditProfForm({
                                ...editProfForm,
                                bio: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editProfForm.department_id}
                            onChange={(e) =>
                              setEditProfForm({
                                ...editProfForm,
                                department_id: e.target.value,
                              })
                            }
                          >
                            {departments.map((dept) => (
                              <MenuItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleUpdateProfessor(prof.id)}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => setCurrentlyEditingProfId(null)}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{prof.name}</TableCell>
                        <TableCell>{prof.email}</TableCell>
                        <TableCell>{prof.bio}</TableCell>
                        <TableCell>{prof.department_id}</TableCell>
                        <TableCell>
                          <Button onClick={() => startEditingProfessor(prof)}>
                            Edit
                          </Button>
                          <Button
                            color="error"
                            onClick={() => handleDeleteProfessor(prof.id)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
