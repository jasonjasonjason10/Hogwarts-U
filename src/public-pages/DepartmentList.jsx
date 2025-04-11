import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItemText,
  Paper,
  Typography,
  Box,
  ListItemButton,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${API_URL}/departments`);
        const data = await res.json();
        setDepartments(data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom sx={{color: "white"}}>
        Departments at Hogwarts
      </Typography>

      <List component={Paper}>
        {departments.map((dept) => (
          <ListItemButton
            key={dept.id}
            onClick={() => navigate(`/departments/${dept.id}`)}
            sx={{
              borderBottom: "1px solid #ccc",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
              cursor: "pointer",
            }}
          >
            <ListItemText
              primary={dept.name}
              secondary={dept.description}
              primaryTypographyProps={{ fontWeight: "bold" }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentList;

