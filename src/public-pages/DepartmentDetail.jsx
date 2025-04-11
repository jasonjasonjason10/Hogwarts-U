// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Typography,
//   Container,
//   Paper,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";

// const API_URL = import.meta.env.VITE_API_URL;

// const DepartmentDetail = () => {
//   const { id } = useParams();
//   const [department, setDepartment] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDepartment = async () => {
//       try {
//         const res = await fetch(`${API_URL}/departments/${id}`);
//         const data = await res.json();
//         setDepartment(data);
//       } catch (err) {
//         console.error("Error fetching department:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDepartment();
//   }, [id]);

//   if (loading) {
//     return (
//       <Container>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (!department) {
//     return <Typography>Department not found.</Typography>;
//   }

//   return (
//     <Container>
//       <Paper elevation={3} sx={{ padding: 4, marginTop: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           {department.name}
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           {department.description}
//         </Typography>
//         {department.contact_email && (
//           <Typography variant="body2" color="textSecondary" gutterBottom>
//             Contact: {department.contact_email}
//           </Typography>
//         )}

//         {department.banner_image && (
//           <img
//             src={department.banner_image}
//             alt="Banner"
//             style={{
//               width: "100%",
//               maxHeight: 300,
//               objectFit: "cover",
//               marginTop: 16,
//             }}
//           />
//         )}

//         {department.faculty && department.faculty.length > 0 && (
//           <>
//             <Typography variant="h6" mt={4}>
//               Faculty
//             </Typography>
//             <List>
//               {department.faculty.map((prof) => (
//                 <ListItem key={prof.id} divider>
//                   <ListItemText primary={prof.name} secondary={prof.bio} />
//                 </ListItem>
//               ))}
//             </List>
//           </>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default DepartmentDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

const DepartmentDetail = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await fetch(`${API_URL}/departments/${id}`);
        const data = await res.json();
        setDepartment(data);
      } catch (err) {
        console.error("Error fetching department:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  if (loading) return <p>Loading department info...</p>;
  if (!department) return <p>Department not found</p>;

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        {department.banner_image && (
          <Box
            sx={{
              width: "100%",
              height: 300,
              backgroundColor: "black",
              backgroundImage: `url(${department.banner_image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 2,
              mb: 3,
            }}
          />
        )}

        <Typography variant="h4" gutterBottom>
          {department.name}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Description:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {department.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Contact:
        </Typography>
        <Typography variant="body1" gutterBottom>
          {department.contact_email || "No email listed"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Faculty:
        </Typography>

        {department.faculty && department.faculty.length > 0 ? (
          <List>
            {department.faculty.map((prof) => (
              <React.Fragment key={prof.id}>
                <ListItem disableGutters>
                  <ListItemText
                    primary={prof.name}
                    secondary={prof.email || "No email provided"}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body2">
            No faculty in this department.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default DepartmentDetail;
