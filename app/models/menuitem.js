const mongoose = require('mongoose');
const Schema = mongoose.Schema //here has 'S' as capital because we are assigning class or constructor function to it 

const menuSchema = new Schema({
    name:{type:String, requried: true},
    image:{type:String, requried: true},
    price:{type:Number, requried: true},
    size:{type:String, requried: true}
})
// above is the blueprint of the table

// now using this blueprint we have to make a model



module.exports = mongoose.model('Menuitem', menuSchema);