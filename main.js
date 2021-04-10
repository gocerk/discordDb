const Discord = require('discord.js');
const client = new Discord.Client();
const DataModel = require('./db/models/dataModel');
const saveToDatabase = require('./db/save');
const fetchDatas = require('./db/fetch');
const credentials = require('./credentials.json');

const token = credentials['token'];

const getArgs = (prefix , msg) => {
    let msgArray = msg.split(" ");
    let prefixs = prefix;
    msgArray[0].replace(prefixs, ""); 
    let args = msgArray.slice(1);
    return args;  
}

client.on('ready', () => {
    console.log('Bot is ready');
});

client.on('message' , async (msg) => {
    if(msg.content.includes('!kaydet')){
        let args = getArgs('!' , msg.content);
        if(msg.attachments.size > 0) {
            const arr = Array.from(msg.attachments)
            arr.forEach(item => {
                args[1] = item[1].url;
            });
        }

        try {
            const model = new DataModel({title: args[0] , content: args[1]});
            await saveToDatabase.save(model);
            msg.reply('I saved it sir');
        }catch(e){
            msg.reply(`There are a problem at saving part: ${e}`);
        }
    }

    if(msg.content.startsWith('!ara')) {
        let args = getArgs('!' , msg.content); 
        try {
            const searchResults = await fetchDatas.fetch(args[0]);
            for(let x =0; x<searchResults.length; x++) {
                msg.reply(`Title: ${searchResults[x].title}\nContent: ${searchResults[x].content}\nCreated at: ${searchResults[x].createdAt}`);
            }
        }catch(e){
            msg.reply(`There are a problem at fetching part: ${e}`);
        }
    }

    if(msg.content == 'ping') {
        msg.reply('pong');
    }
});

client.login(token);