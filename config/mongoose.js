const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/issueTracker').then(()=>console.log("Connected with issueTracker DB"));