// all the logic and control of homepage will be here

function homeController(){
    return{
        index(req, res){
            res.render('home')
        }
    }
}

module.exports = homeController; //this function is being exported and it will get called in the web.js routes for '/'