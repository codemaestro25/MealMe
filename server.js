// main file from where our server starts
require('dotenv').config() //accessing all the variables in the .env file
const express = require('express');
const app = express(); //main express object stored in variable in app
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300; //USE OF ENIVROMENT VARIBLE , also the || acts as if else here
const mongoose = require('mongoose')
const session = require('express-session');
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session) //here we have written 'M' capital that means it stores a classs and a constructor fucntion , so the '()' here indicates the constrcutor of the recieved class
// new MongoDbStore(session)
const passport = require('passport')


// database connection
const url = 'mongodb://127.0.0.1/pizzaApp';
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', function(){
    console.log("Database Connected")
}).on('error', (err)=>{
    console.log("Connection to database failed");
})

// passport config
const passportInit = require('./app/config/passport');
passportInit(passport); 
// app.use(cookieParser());
app.use(passport.initialize()); //for initializing the passport
app.use(passport.session()); //bcoz we will store the passport in the session

// session store - for storing the session in the mongodb
let mongoStore = new MongoDbStore({
    mongooseConnection: connection, //this is the connection variable created above to store the mognodb connection
    collection: 'sessions' // mentioning the collection in the db where you will store the sessions
})


// session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {maxAge: 1000*60*60*24}
}))
// by default the session gets stored in the memeory of the computer but here we want to store the session in our db hence we mention a field here named store which tells the system where to store the session
// note- the sesion will automatically get vanished from the db after the cookie time expires





// keep the passport configuration afterthe session




app.use(flash())
// Assets
app.use(express.static('public')) //assets kaape rakhe hai voh express ko batana hai
app.use(express.json()); //to also fetch json responses in epxress js
app.use(express.urlencoded({extended:false})); //for fetching the auth details of the user in responses







// global middlewares
app.use((req, res, next)=>{
    res.locals.session = req.session; //we are doing this to pass the session to our home.ejs
    res.locals.user = req.session.passport //for passing user to layout.ejs
    // console.log(req.session.passport.user);
    next(); // we need to call this next func or else the request wont be executed ever

})

// set template engine to tell express that which template we are using
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views')); //telling express where are the views
app.set('view engine', 'ejs')

// make sure that all your routes are placed after the above block only , or else it will create render issues

require('./routes/web')(app) // here '(app)' this means we are calling the the function initRoutes(app) present in web.js and pass the instance of app which is our express app to the function


app.listen(PORT , ()=>{
    console.log(`Listening on PORT ${PORT}`)
}) 