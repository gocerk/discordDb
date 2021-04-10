const mongoose = require('mongoose');

const dataModel = new mongoose.Schema({
    title: String, 
    content: String,
    createdAt: {
        type: Date, 
        default: new Date(),
    }
});

module.exports = mongoose.model('discord_records' , dataModel);