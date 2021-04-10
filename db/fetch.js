const mongoose = require('mongoose');
const Model = require('./models/dataModel');
const credentials = require('../credentials.json');

const connectionUri = credentials['mongoDbUri'];

module.exports.fetch = async (titleText) => {
    let fetchedDatas = [];
    try {
        await mongoose.connect(connectionUri , ({useNewUrlParser: true , useUnifiedTopology: true})); 
        const results = await Model.find({title: titleText});
        results.forEach(item => {
            fetchedDatas.push(item);
        });
    }catch(e){
        throw e;
    }
    return fetchedDatas; 
}