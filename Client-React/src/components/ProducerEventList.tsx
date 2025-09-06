

import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { EventContext } from "../context/Event.context";
import { Box, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
export const ProducerEventList = () => {
    const { producerId } = useParams();
    const { events, deleteEvent } = useContext(EventContext);

    const eventArr = producerId && Array.isArray(events) ? events.filter(e => e?.producerId === producerId) : [];

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
            {eventArr && eventArr.length > 0 ? (
                <List>
                    {eventArr.map((e, index) => (
                        <ListItem key={e._id || index} sx={{ borderBottom: "1px solid #ddd" }}>
                            <ListItemText 
                                primary={
                                    <NavLink to={`/ProducerEventDetails/${e._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        {e.name}
                                    </NavLink>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteEvent?.(e._id!)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    למפיקה זו אין אירועים
                </Typography>
            )}
            <Box sx={{ mt: 3, textAlign: "center" }}>
                <NavLink to={`/AddEvent/${producerId}`} style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">
                        הוספת אירוע
                    </Button>
                </NavLink>
            </Box>
        </Box>
    );
};