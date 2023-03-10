function cartController(){
    return{
        index(req,res){
            res.render('customers/cart');
        },
        update(req, res){
            
            // check whether there is no cart i.ee empty cart
            // first time creating the cart and creating the basic object strcuture
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart;
            console.log(req.body);

            // checking whehter an item is already existing in the cart or not
            if(!cart.items[req.body._id]){
                // adding a new pizza
                cart.items[req.body._id]={
                    item : req.body,
                    qty:1,
                }
                cart.totalQty = cart.totalQty+1;
                cart.totalPrice = cart.totalPrice + req.body.price; 
            }else{
                // if a particular pizza already exists and the user increases its quantity
                cart.items[req.body._id].qty = cart.items[req.body._id].qty+1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }

            res.json({totalQty: req.session.cart.totalQty})
        }
    }
}

module.exports = cartController;