


import { NavLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export const ProducerMenu = () => {
  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        mt: 4,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        תפריט מפיקות
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <NavLink to="/AddProducer" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" fullWidth>
            הוספת מפיקה
          </Button>
        </NavLink>
        <NavLink to="/ProducerDetails" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" fullWidth>
            מפיקה קיימת
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};