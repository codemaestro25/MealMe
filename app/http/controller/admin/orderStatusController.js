const Orders = require('../../../models/order');

function orderStatusController(){
    return{
        update(req, res){
            // console.log(req.body);
            Orders.updateOne({_id : req.body.orderId}, {orderStatus : req.body.status}).then( data =>{
                // console.log(data);
                return res.redirect('/admin/orders');

            }).catch(err =>{
                console.log(err);
                return res.redirect('/admin/orders');
            })
        }
    }
}

module.exports = orderStatusController;