


import { useContext } from "react";
import { useParams } from "react-router-dom";
import { EventContext } from "../context/Event.context";
import { useHttp } from "../custom-hooks/useHttp";
import { Producer } from "../types/Producer";
import { Box, Typography, Button, CircularProgress, Card, CardContent, Alert } from "@mui/material";

export const UserEventDetails = () => {
    const { id } = useParams();
    const { events } = useContext(EventContext);
    const { data: producer, loading, error, request } = useHttp<Producer | null>("");

    if (!events || events.length === 0) {
        return <Typography variant="h6" align="center">טוען אירועים...</Typography>;
    }

    const event = events.find(e => e._id === id);

    if (!event) {
        return <Typography variant="h6" align="center">אירוע לא נמצא</Typography>;
    }

    const handleShowProducer = async () => {
        if (event.producerId) {
            await request(`/producer/${event.producerId}`);
        }
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
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="body1"><strong>שם:</strong> {event.name}</Typography>
                    <Typography variant="body1"><strong>תיאור:</strong> {event.description}</Typography>
                    <Typography variant="body1"><strong>מפיק:</strong> {event.producerId}</Typography>
                </CardContent>
            </Card>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleShowProducer} 
                fullWidth
                sx={{ mb: 2 }}
            >
                פרטי מפיקה/ה
            </Button>
            {loading && <CircularProgress sx={{ display: "block", margin: "auto", mb: 2 }} />}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {producer && (
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            פרטי מפיקה/ה
                        </Typography>
                        <Typography variant="body1"><strong>שם:</strong> {producer.name}</Typography>
                        <Typography variant="body1"><strong>אימייל:</strong> {producer.email}</Typography>
                        <Typography variant="body1"><strong>טלפון:</strong> {producer.phone}</Typography>
                        <Typography variant="body1"><strong>תיאור:</strong> {producer.description}</Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};