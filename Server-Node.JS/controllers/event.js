const express = require('express');
const productions = require('../models/productions');
const mongoose = require("mongoose");
const router = express.Router();

router.get('/productions', async (req, res, next) => {
    try {
        res.status(200).send(await productions.find());
    }
    catch (error) {
        next(error);
    }
});

router.get('/productions/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send({ message: 'Invalid ID format' });
        const production = await productions.findById(id);
        if (!production)
            return res.status(404).send({ message: 'Production not found' });
        res.send(production);
    } catch (err) {
        next(err);
    }
});

router.post('/productions', async (req, res, next) => {
    try {
        const { name, description, producerId } = req.body;
        if (!name || !description || !producerId)
            return res.status(400).json({ message: "נא לספק את כל השדות: name, description, producer_id" });
        const newProductions = new productions({ name, description, producerId });
        await newProductions.save();
        res.status(201).send(newProductions);
    } catch (err) {
        next(err);
    }
});

router.put('/productions/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(400).send({ message: 'Invalid ID format' });
        const { name, description, producerId } = req.body;

        if (!name || !description || !producerId)
            return res.status(400).json({ message: "נא לספק את כל השדות: name, description, producerId" });
        const updatedProduction = await productions.findOneAndUpdate(
            { _id: id },
            { name, description, producerId },
            { new: true, runValidators: true }
        );
        if (!updatedProduction)
            return res.status(404).json({ message: "הארוע לא נמצא" });
        res.status(200).json({ message: "הארוע עודכן בהצלחה!", production: updatedProduction });
    } catch (error) {
        next(error);
    }
});


router.delete('/productions/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid ID format' });
        }
        const result = await productions.deleteOne({ _id: new mongoose.Types.ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'האירוע לא נמצא' });
        }

        res.status(200).send({ message: 'האירוע נמחק בהצלחה' });
    } catch (err) {
        next(err);
    }
});


module.exports = router;