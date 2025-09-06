

import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { EventContext } from "../context/Event.context";
import { Box, Typography, TextField, List, ListItem, ListItemText } from "@mui/material";

export const UsersEventList = () => {
    const { events } = useContext(EventContext);
    const [searchTerm, setSearchTerm] = useState("");

    if (!events || events.length === 0) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                אין נתונים להצגה
            </Typography>
        );
    }

    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box 
            sx={{
                maxWidth: 600,
                margin: "auto",
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
                mt: 4,
            }}
        >
            <Typography variant="h5" component="h1" gutterBottom>
                רשימת אירועים
            </Typography>
            <TextField
                fullWidth
                label="חפש אירוע..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 3 }}
            />
            <List>
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((e) => (
                        <ListItem key={e._id} sx={{ borderBottom: "1px solid #ddd" }}>
                            <ListItemText
                                primary={
                                    <NavLink
                                        to={`/UserEventDetails/${e._id}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        {e.name}
                                    </NavLink>
                                }
                            />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1" color="textSecondary" align="center">
                        לא נמצאו אירועים
                    </Typography>
                )}
            </List>
        </Box>
    );
};