const Order = require('../../../models/order');
const moment = require('moment');

function orderController(){
    return{
        store(req, res){
            // destructuring phone and address coming from the 
            const {phone , address} = req.body;
            // validating the order
            if(!phone , !address){
                req.flash('error',"Provide your Phone no and Address");
                res.redirect('/cart');
            }
             const order = new Order({
                customerId : req.session.passport.user,
                items: req.session.cart.items,
                phone : phone,
                address : address
             });

             order.save().then(result=>{
                req.flash('success',"Order Placed Successfully!");
                return res.redirect('/');
             }).catch(err =>{
                req.flash('error', "something went wrong");
                console.log(err);
                return res.redirect('./cart');
             })
        },
       async index(req, res){
            const orders = await Order.find({customerId: req.session.passport.user})
            
            res.render('customers/orders', {orders : orders, moment : moment}); //orders is an array, through moment variable we are sending the moment library which we installed for showing the time
        }
    }
}

module.exports = orderController;