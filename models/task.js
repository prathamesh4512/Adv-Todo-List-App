// using mongoose to create schema 
const mongoose = require("mongoose");

// creating schema
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        required: true
    },
})

// populating model from schema
const Task = mongoose.model("Task", taskSchema);

// exporting model Task
module.exports = Task;