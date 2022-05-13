const express = require('express');
// using express router for routing 
const router = express.Router();

// require home_controller for calling actions
const homeController = require('../controllers/home_controller');


router.get('/',homeController.taskList);

//route to display the home page which has Sorted list by deadline and everything
router.get("/sorted-task-list", homeController.taskListSorted);

// Route to add task
router.post("/add-task", homeController.add);

// Route to delete a single task
router.get("/delete-task", homeController.delete);

// Route to delete all items in list(db)
router.get("/delete-all", homeController.deleteAll);

// Route to update  state of list item from (db) from completed to not and vice versa.
router.get("/update-state", homeController.updateStat);

// Route to delete only completed items
router.get("/delete-completed", homeController.deleteCompleted)

// exporting router & require in index.sj
module.exports=router;