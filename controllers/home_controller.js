const Task = require("../models/task");
const db = require("../config/mongoose");

// This functions finds the whole list in database and then renders taskList.ejs
// it sends additional paramets which is to tell to update layout so that 
// user can filter by sorted or unsorted

module.exports.taskList = function(req,res){

    Task.find({},function(err,tasks){
        if(err){
            console.log('Error in fetching data from DB',err);
        }else{
            return res.render('task_list',{
                task_list: tasks,
                link_to_page_filter: "/sorted-task-list",
                filter_page_name: "Sort By Deadline"
            });
        }
    })
}

module.exports.taskListSorted = function(req,res){
    Task.find({},function(err,tasks){
        if(err){
            console.log('Error in fetching data from DB',err);
        }else{
            return res.render('task_list_sorted',{
                task_list: tasks,
                link_to_page_filter: "/",
                filter_page_name: "Sort Normally"
            });
        }
    })
}

// Adds a list in db and then goes back
// The important things to find in this is that the deadline is being converted to
// the correct time by adding 18:29:59 because default is 05:30:00
// it also adds a parameter state in the list item which indicates that either
// the task is completed or not

module.exports.add = function (req, res) {
    req.body.state = 0;
    req.body.date = new Date(req.body.date + "T18:29:59Z");

    Task.create(req.body, function (err, newTask) {
        if (err) {
            console.log("error in creating a task",err);
            return;
        }
        else {
            return res.redirect("back");
        }
    });
}

// Queries on the basis of id passed by view db and deletes the item.
module.exports.delete = function (req, res) {
    let id = req.query.id;
    Task.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error in deletion",err);
            return;
        }
        else {
            return res.redirect('back');
        }
    })
}

// Deletes all items unconditionally
module.exports.deleteAll = function (req, res) {
    Task.deleteMany({}, function (err) {
        if (err) {
            console.log("error in deletion");
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    })

}

// Delete only those items whose state is 1 (ie completed)
module.exports.deleteCompleted = function (req, res) {
    Task.deleteMany({ "state": "1" }, function (err) {
        if (err) {
            console.log("error in deletion");
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    })
}

// Queries db using id and updates state given by query param
//  and return a json object about success of thhe
module.exports.updateStat = function (req, res) {

    const id = req.query.id;
    const state = parseInt(req.query.state);

    Task.updateOne({ "_id": id }, { $set: { state: state } }, function (err) {
        if (err) {
            console.log("Error in finding user!!!!");
            return res.end('{ "status":"failed"}');
        }
        else {
            console.log("Updated!");
            return res.end('{ "status":"success"}');
        }
    })
}



