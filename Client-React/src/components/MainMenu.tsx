

import { NavLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export const MainMenu = () => {
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
        תפריט ראשי
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <NavLink to="/ProducerMenu" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" fullWidth>
            כניסת מפיקות
          </Button>
        </NavLink>
        <NavLink to="/UsersEventList" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary" fullWidth>
            כניסת משתמשים 
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};