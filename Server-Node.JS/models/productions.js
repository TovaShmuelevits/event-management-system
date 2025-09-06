const mongoose = require("mongoose");

const productionSchema = new mongoose.Schema({
    name: String,
    description: String,
    producerId: String
},
    {
        versionKey: false
    })

const production = mongoose.model("production", productionSchema);

module.exports = production; 
