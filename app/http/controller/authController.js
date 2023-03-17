
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

function authController(){
    return{
        login(req,res){
            res.render('auth/login');
        },

        loginUser(req, res, next){
            // next here is a callback which we call in order to execute the request when everything is alright, acts as a middleware
            passport.authenticate('local', (err, user, info)=>{
                // here 'local' is the passport authentication type we are using(refer docs)
                // info contains all the messages that we wrote in passport.js
                if(err){
                    console.log(info.message);
                    req.flash('error', info.message);
                    return next(err);
                }
                if(!user){
                    // means no user found
                    console.log(info.message);
                    req.flash('error', info.message);
                    return res.redirect('/login');
                }
                req.logIn(user, (err)=>{
                    // if any error occuurs in the login process
                    if(err){
                        console.log(info.message);
                        req.flash('error', info.message); //for the messag something went wrong
                        return next(err);
                    }
                    // if all is good then redirecting the user to homepage
                    console.log(info.message);
                    return res.redirect('/');
                })
            })(req, res, next);
            // here the above exra function is called because the passport.authencticate method return a function and we need to call that method, which we have done in the above line
        },

        register(req,res){
            res.render('auth/register');
        },
        async registerUser(req, res){
            const{name , email , password} = req.body;
            console.log(req.body);
            // validation
            if(!name || !email || !password){
                req.flash('error','You need to fill all of them'); //flash request are sent only once and they are being used to display messages such as error from the  server
                req.flash('name', name); //they have a key and value pair , here in above line 'error' is key using which we can access this flash message on our frontend
                req.flash('email',email );
                return res.redirect('/register')
            }
            // checking if the user already exists
           
            const findUser = await User.findOne({email})
            if(findUser){//that means that user email already exists in the db
                req.flash("error", "Already Registred..!!")
                 return res.redirect("/register")
            }
            // hashing the received password
            const hashPassword = await bcrypt.hash(password, 10);
            // creating a new user using the Usermodel
            const user = new User({
                name: name,
                email: email,
                password: hashPassword
            })

            user.save().then((user)=>{
                // Logging him in directly code - todo

                return res.redirect('/')
            }).catch(err=>{
                new Noty({
                    type:'error',
                    text:'Something went wrong :(',
                    timeout:2000
                }).show();
                return res.redirect('/register')
            })
        },
        logoutRoute(req, res){
        //    req.logOut(function(err){
        //         if (err) throw err;
        //         req.session.destroy((err) => {
                   
        //           });
        //     })
            req.logout();
            res.clearCookie('connect.sid');
            return res.redirect('/login')
        }


    }
}

module.exports = authController;