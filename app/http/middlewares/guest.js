function guest(req, res, next){
    if(!req.isAuthenticated()){
        // checking if the user is not previously logged in
        return next();
    }
    console.log(!req.isAuthenticated());
    return res.redirect('/');
}

module.exports = guest;