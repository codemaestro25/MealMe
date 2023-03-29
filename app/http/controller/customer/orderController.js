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
                Order.populate(result , {path: 'customerId'}).then((placedOrder)=>{
                    //populate func for fetching the user object using the customerId, placedOrder contains the complete order along with the name of the user fetched from users collection using the customerId.
                    req.flash('success',"Order Placed Successfully!");
                    delete req.session.cart;
                    // emit the socket event
                    const eventEmitter = req.app.get('eventEmitter');
                    eventEmitter.emit('orderPlaced', placedOrder)
                    return res.redirect('/orders');
                }).catch(err =>{
                req.flash('error', "something went wrong");
                console.log(err);
                return res.redirect('./cart');
             });
        });
        },
        async index(req, res){
            const orders = await Order.find({customerId: req.session.passport.user})
            
            res.render('customers/orders', {orders : orders, moment : moment}); //orders is an array, through moment variable we are sending the moment library which we installed for showing the time
        },

        async show(req, res){
            // console.log(req);
            const order = await Order.findById(req.params.id);
            // console.log(orders._id.toString());
            // console.log(req.session.passport.user);
            // console.log(orders.customerId.toString());
            if(req.session.passport.user.toString() == order.customerId.toString()){

                return res.render('customers/statusOrder', {order : order});
            }
           else{
                return res.redirect('/');
           }        

        }
    
}
}

module.exports = orderController;