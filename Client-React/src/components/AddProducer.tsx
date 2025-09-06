

import { useContext } from "react";
import { Producer } from "../types/Producer";
import { ProducerContext } from "../context/Producer.context";
import { useHttp } from "../custom-hooks/useHttp";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

export const AddProducer = () => {
    const { data: producer, error, loading } = useHttp<Producer>('/producer', 'post');
    const { addProducer } = useContext(ProducerContext);
    const navigate = useNavigate(); 

    const submit = async (event: any) => {
        event.preventDefault();
        const producerData: Producer = {
            name: event.target.name.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            description: event.target.description.value,
            _id: ""
        };
        addProducer!(producerData);
        navigate(-1);
    };

    return (
        <Box 
            sx={{
                maxWidth: 400,
                margin: "auto",
                padding: 3,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f9f9f9"
            }}
        >
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="h5" component="h1" gutterBottom>
                הוסף מפיק/ה
            </Typography>
            <form onSubmit={submit}>
                <TextField 
                    fullWidth 
                    label="שם" 
                    name="name" 
                    variant="outlined" 
                    margin="normal" 
                    required 
                />
                <TextField 
                    fullWidth 
                    label="אימייל" 
                    name="email" 
                    type="email" 
                    variant="outlined" 
                    margin="normal" 
                    required 
                />
                <TextField 
                    fullWidth 
                    label="טלפון" 
                    name="phone" 
                    type="tel" 
                    variant="outlined" 
                    margin="normal" 
                    required 
                />
                <TextField 
                    fullWidth 
                    label="תיאור" 
                    name="description" 
                    variant="outlined" 
                    margin="normal" 
                    multiline 
                    rows={4} 
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
                    הוסף מפיק/ה
                </Button>
            </form>
        </Box>
    );
};
