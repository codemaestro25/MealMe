// main file from where our server starts
const express = require('express');
const app = express(); //main express object stored in variable in app
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300; //USE OF ENIVROMENT VARIBLE , also the || acts as if else here

// Assets
app.use(express.static('public')) //assets kaape rakhe hai voh express ko batana hai



// set template engine to tell express that which template we are using
app.use(expressLayouts)
app.set('views', path.join(__dirname, '/resources/views')); //telling express where are the views
app.set('view engine', 'ejs')

// make sure that all your routes are placed after the above block only , or else it will create render issues
app.get('/', (req, res)=>{
    res.render("home");//home.ejs in views folder
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})

app.get('/login', (req,res)=>{
    res.render('auth/login')
})

app.get('/register', (req,res)=>{
    res.render('auth/register')
})

app.listen(PORT , ()=>{
    console.log(`Listening on PORT ${PORT}`)
}) 