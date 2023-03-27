const Order = require('../../../models/order');

function adminOrderController(){
    return {
        index(req , res){

            Order.find({orderStatus : {$ne : 'completed'}}, null , {sort: {'createdAt': -1}}).populate('customerId', '-password').then((orders)=>{
                if(req.xhr){
                    // xhr satnds for xmlhttpreq which is the AJAX req
                    return res.json(orders);
                    // the above code tells that update the page and dont refresh it if the req contains ajax code. if it doesnt completely render thepage which will happen in the case of manual refresh of the page
                }
                else{
                return res.render('admin/orders');
                //populate function will return the MongoDB object corresponding to the customerId
                }
            }).catch(err=>{
                console.log(err);
            })

        }
    }
}

module.exports = adminOrderController;