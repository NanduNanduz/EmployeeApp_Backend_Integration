const mongoose = require('mongoose'); 
// import mongoose 
mongoose.connect(process.env.mongoDB_URL)
.then(()=>{
    console.log('Connection established to DB');
})
.catch(()=>{
    console.log('Not Connected to DB');
})