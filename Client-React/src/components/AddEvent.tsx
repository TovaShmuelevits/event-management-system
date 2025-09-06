
import { useContext, useEffect } from "react";
import { Event as EventType } from "../types/Event";
import { EventContext } from "../context/Event.context";
import { useHttp } from "../custom-hooks/useHttp";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";

export const AddEvent = () => {
    const { data: event, error, loading, request } = useHttp<EventType>('/productions', 'post');
    const { addEvent } = useContext(EventContext);
    const { producerId } = useParams();
    const navigate = useNavigate();

    const submit = async (event: any) => {
        event.preventDefault();
        const eventData: EventType = {
            name: event.target.name.value,
            description: event.target.description.value,
            producerId: producerId!,
        };
        await request('/productions', 'post', eventData);
        event.target.reset();
    };

    useEffect(() => {
        if (event) {
            addEvent!();
            navigate(-1);
        }
    }, [event]);

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
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Typography variant="h5" component="h1" gutterBottom>
                הוסף אירוע חדש
            </Typography>
            <form onSubmit={submit}>
                <TextField
                    fullWidth
                    label="שם האירוע"
                    name="name"
                    variant="outlined"
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="תיאור האירוע"
                    name="description"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : "הוסף אירוע"}
                </Button>
            </form>
        </Box>
    );
};