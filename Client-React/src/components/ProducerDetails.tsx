
import { useState, useEffect } from "react";
import { useHttp } from "../custom-hooks/useHttp";
import { NavLink } from "react-router-dom";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";

export const ProducerDetails = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { data: producer, error: apiError, loading, request } = useHttp<any>('');
    const [producerData, setProducerData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError("יש להזין כתובת מייל.");
            return;
        }
        await request(`/producer/${email}`);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProducerData({
            ...producerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        if (!producerData.name || !producerData.phone || !producerData.description) {
            setError("יש למלא את כל השדות.");
            return;
        }
        await request(`/producer/${producer.email}`, "put", producerData);
    };

    useEffect(() => {
        if (producer) {
            setProducerData({
                name: producer.name,
                email: producer.email,
                phone: producer.phone,
                description: producer.description,
            });
        }
    }, [producer]);

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
            {!producer && (
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        הכנסי כתובת מייל להצגת פרטי המפיק/ה
                    </Typography>
                    <TextField
                        fullWidth
                        label="כתובת מייל"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "הצג פרטי מפיק/ה"}
                    </Button>
                </form>
            )}

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {apiError && <Alert severity="error" sx={{ mt: 2 }}>{apiError}</Alert>}

            {producer && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        פרטי המפיק/ה
                    </Typography>
                    <TextField
                        fullWidth
                        label="שם"
                        name="name"
                        value={producerData.name}
                        onChange={handleEditChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="אימייל"
                        value={producerData.email}
                        variant="outlined"
                        margin="normal"
                        disabled
                    />
                    <TextField
                        fullWidth
                        label="טלפון"
                        name="phone"
                        value={producerData.phone}
                        onChange={handleEditChange}
                        variant="outlined"
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="תיאור"
                        name="description"
                        value={producerData.description}
                        onChange={handleEditChange}
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <Button
                        onClick={handleUpdate}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : "עדכן פרטי מפיק/ה"}
                    </Button>
                    <Box sx={{ mt: 3 }}>
                        <NavLink to={`/ProducerEventList/${producer.email}`} style={{ textDecoration: "none" }}>
                            <Button variant="outlined" color="primary" fullWidth>
                                ארועי המפיק/ה
                            </Button>
                        </NavLink>
                    </Box>
                </Box>
            )}
        </Box>
    );
};