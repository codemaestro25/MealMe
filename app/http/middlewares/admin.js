const User = require('../../models/user');
async function admin(req, res , next){
    
    // const user = await User.findOne({_id:req.session.passport.user})
    // console.log(user.role); 
    // if(req.isAuthenticated() && user.role === 'admin'){
    //     return next();
    // }
    // return res.redirect('/');
}

module.exports = admin;