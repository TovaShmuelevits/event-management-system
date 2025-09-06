

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventContext } from "../context/Event.context";
import { useHttp } from "../custom-hooks/useHttp";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";

export const ProducerEventDetails = () => {
    const { id } = useParams();
    const { events, updateEvent } = useContext(EventContext);
    const { request, loading, error } = useHttp(`/events/${id}`, "put");
    const navigate = useNavigate();

    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        producerId: "",
    });

    useEffect(() => {
        const event = events?.find(e => e._id === id);
        if (event) {
            setEventData({
                name: event.name,
                description: event.description || "",
                producerId: event.producerId,
            });
        }
    }, [id, events]);

    if (!events || events.length === 0) {
        return <Typography variant="h6" align="center">טוען אירועים...</Typography>;
    }

    if (!eventData.name) {
        return <Typography variant="h6" align="center">אירוע לא נמצא</Typography>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        await request(`/productions/${id}`, "put", eventData);
        updateEvent?.(id!, eventData);
        navigate(-1);
    };

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
                פרטי האירוע
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSave}>
                <TextField
                    fullWidth
                    label="שם האירוע"
                    name="name"
                    value={eventData.name}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="תיאור"
                    name="description"
                    value={eventData.description}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    label="מפיק"
                    value={eventData.producerId}
                    variant="outlined"
                    margin="normal"
                    disabled
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : "שמור שינויים"}
                </Button>
            </form>
        </Box>
    );
};