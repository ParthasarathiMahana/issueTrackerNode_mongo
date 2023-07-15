const mongoose = require('mongoose');

const IssueSchema = mongoose.Schema({
    projectId:{
        type: mongoose.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    labels:{
        type: [String],
        required: true
    },
    author:{
        type: String,
        required: true
    }
})

const Issues = mongoose.model("Issue", IssueSchema);
module.exports = Issues;
