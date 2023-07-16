const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async()=>{
    try{
        // process.env.MONGO_URI
        // const conn = await mongoose.connect('mongodb://127.0.0.1:27017/issueTracker').then(()=>console.log("Connected with issueTracker DB"));
        const conn = await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Connected with issueTracker DB"));
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;