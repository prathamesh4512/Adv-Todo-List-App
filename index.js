const express = require('express');
const port =8000; // setting port 

//using express-js-layouts for showing basic layout
const expressLayouts = require("express-ejs-layouts");

// Require DB connection
const db = require("./config/mongoose");

// Import model for using it further
const Task = require("./models/task");

// calling express server
const app = express();

// Static files
app.use(express.static("./assets"));

// extract style and scripts from sub pages into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use layouts
app.use(expressLayouts);

// read request,express inbuilt middleware
app.use(express.urlencoded());

// setting up view engine 
app.set('view engine', 'ejs');
app.set('views','./views');

// all routes are handel by routes folder
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log('Error with connecting to browser',err)
    }
    console.log(`Server is listening on ${port}`);
});