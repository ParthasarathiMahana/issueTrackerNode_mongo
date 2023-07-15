const mongoose = require('mongoose');

const  projectSchema = new mongoose.Schema({
    nameOfProject:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;