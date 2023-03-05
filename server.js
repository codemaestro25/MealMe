// main file from where our server starts
const express = require('express');
const app = express(); //main express object stored in variable in app
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300; //USE OF ENIVROMENT VARIBLE , also the || acts as if else here
const mongoose = require('mongoose')

// database connection

const url = 'mongodb://127.0.0.1/pizzaApp';
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("Database Connected")
}).on('error', (err)=>{
    console.log("Connection to database failed");
})





// Assets
app.use(express.static('public')) //assets kaape rakhe hai voh express ko batana hai



// set template engine to tell express that which template we are using
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views')); //telling express where are the views
app.set('view engine', 'ejs')

// make sure that all your routes are placed after the above block only , or else it will create render issues

require('./routes/web')(app) // here '(app)' this means we are calling the the function initRoutes(app) present in web.js and pass the instance of app which is our express app to the function


app.listen(PORT , ()=>{
    console.log(`Listening on PORT ${PORT}`)
}) 