const Orders = require('../../../models/order');

function orderStatusController(){
    return{
        update(req, res){
            // console.log(req.body);
            Orders.updateOne({_id : req.body.orderId}, {orderStatus : req.body.status}).then( () =>{
                // emit the event
                const eventEmitter = req.app.get('eventEmitter');//accessing the event emitter instance from the server.js
                eventEmitter.emit('orderUpdated', {id: req.body.orderId, orderStatus : req.body.status})
                
                return res.redirect('/admin/orders');

            }).catch(err =>{
                console.log(err);
                return res.redirect('/admin/orders');
            })
        }
    }
}

module.exports = orderStatusController;