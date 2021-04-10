const mongoose = require('mongoose');
const credentials = require('../credentials.json');

const connectionUri = credentials['mongoDbUri'];

module.exports.save = async (dataModel) => {
    try {
        await mongoose.connect(connectionUri , ({useNewUrlParser: true , useUnifiedTopology: true})); 
        dataModel.save();
        console.log('saved');
    }catch(e){
        throw e;
    }
}