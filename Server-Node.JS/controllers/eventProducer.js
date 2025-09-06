const express = require('express');

const Producer = require('../models/producers');
const router = express.Router();

router.get('/producer/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const producer = await Producer.findOne({ email: email });

        if (!producer) {
            return res.status(404).send('producer not found');
        }
        res.status(200).send(producer);
    } catch (error) {
        next(error);
    }
});

router.post('/producer', async (req, res) => {
    try {
        const { name, email, phone, description } = req.body;
        if (!name || !email || !phone || !description)
            return res.status(400).json({ message: "נא לספק את כל השדות: name, email, phone, description" });
        const newProducer = new Producer({ name, email, phone, description });
        await newProducer.save();
        res.status(201).json({ message: "המפיק נוסף בהצלחה!", producer: newProducer });
    } catch (error) {
        next(error);
    }
});

router.put('/producer/:email', async (req, res) => {
    try {
        const email = req.params.email; 
        const { name, phone, description } = req.body; 

        if (!name || !phone || !description) 
            return res.status(400).json({ message: "נא לספק את כל השדות: name, phone, description" });
        const updatedProducer = await Producer.findOneAndUpdate(
            { email: email },
            { name, phone, description },
            { new: true }
        );
        if (!updatedProducer) 
            return res.status(404).json({ message: "המפיק לא נמצא" });
        res.status(200).json({ message: "המפיק עודכן בהצלחה!", producer: updatedProducer });
    } catch (error) {
        next(error);
    }
});

module.exports = router;