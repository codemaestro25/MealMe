const homeController = require('../app/http/controller/homeController');
const authController = require('../app/http/controller/authController');
const cartController = require('../app/http/controller/customer/cartController');
const orderController = require('../app/http/controller/customer/orderController');
const guest = require('../app/http/middlewares/guest');

function initRoutes(app){
    app.get('/', homeController().index) //here using homeController variable we are calling the fucntion exported from homecontroller.js and within that function we are calling the index method
    
    app.get('/login' , authController().login);
    app.post('/login' ,  authController().loginUser);
    
    app.get('/register' , authController().register); //for opening the register page
    app.post('/register' ,  authController().registerUser); // for sending the user details enter in the register form
    app.post('/logout' , authController().logoutRoute);

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update);

    app.get('/orders', orderController().index);
    app.post('/orders', orderController().store);

}

module.exports = initRoutes;