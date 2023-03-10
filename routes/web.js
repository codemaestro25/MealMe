const homeController = require('../app/http/controller/homeController');
const authController = require('../app/http/controller/authController');
const cartController = require('../app/http/controller/customer/cartController');

function initRoutes(app){
    app.get('/', homeController().index) //here using homeController variable we are calling the fucntion exported from homecontroller.js and within that function we are calling the index method
    
    app.get('/login', authController().login)
    
    app.get('/register', authController().register)
    
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
}

module.exports = initRoutes;