
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const EventProductionRouter = require('./controllers/eventProducer');
const EventRouter = require('./controllers/event');
const cors = require('cors');

const connectDB = mongoose.connect('mongodb://localhost:27017/EventProduction');

const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(EventProductionRouter);
app.use(EventRouter);
app.use(express.json())

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
