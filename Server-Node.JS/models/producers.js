
const mongoose = require("mongoose");

const producerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    description: String
},{
    versionKey: false
})


const producer = mongoose.model("producer", producerSchema);

module.exports = producer; 
