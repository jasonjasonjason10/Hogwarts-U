import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(`${API_URL}/faculty`);
        const data = await res.json();
        setFaculty(data);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      }
    };

    fetchFaculty();
  }, []);

  const handleOpen = (prof) => setSelectedProf(prof);
  const handleClose = () => setSelectedProf(null);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom sx={{color: "white"}}>
        Meet Our Professors
      </Typography>
      <Grid container spacing={3}>
        {faculty.map((prof) => (
          <Grid item key={prof.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={prof.profile_image}
                alt={prof.name}
              />
              <CardContent>
                <Typography variant="h6">{prof.name}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen(prof)}
                  sx={{ marginTop: 1 }}
                >
                  See Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal open={!!selectedProf} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 500,
            width: "90%",
          }}
        >
          {selectedProf && (
            <>
              <Typography variant="h5">{selectedProf.name}</Typography>
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Email: {selectedProf.email}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Bio: {selectedProf.bio}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Department ID: {selectedProf.department_id}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FacultyList;
