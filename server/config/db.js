const mongoose = require('mongoose');
const db = mongoose.connect(process.env.MONGODB_URL)
    .then(() => { 
        console.log('connected to database')
     }) 
     .catch((err)=>{ 
        console.log("A error is connecting to database", err);     
    }) 

module.exports = db; 