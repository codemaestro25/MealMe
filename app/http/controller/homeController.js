// all the logic and control of homepage will be here
const Menuitem = require('../../models/menuitem')

function homeController(){
    return{
        async index(req, res){
            // fetching th pizzas from database
            const pizzas = await Menuitem.find()
            // console.log(pizzas)
            return res.render('home', {pizzas: pizzas}) //in this line first pizzas is the key which the fornt end recieves in that we have 'pizzas' which is the value and which is a array of documents 
            
            // or we can also do it without async - await like
            // Menuitem.find().then(function(pizzas){
            //     console.log(pizzas);
            //     return res.render('home', {pizzas:pizzas});
            // })

        }
    }
}

module.exports = homeController; //this function is being exported and it will get called in the web.js routes for '/'