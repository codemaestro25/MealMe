const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true,
    },
    items:{
        type : Object,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    paymentMode: {
        type : String,
        default : 'COD'
    },
    orderStatus : {
        type : String,
        default : 'order_placed'
    }
});

module.exports = mongoose.model('Order', orderSchema);