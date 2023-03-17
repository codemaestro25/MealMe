const LocalStrategy = require('passport-local').Strategy; // here we are using the passport library for authentication process. In that passport library we are using the 'local' method becausie we are locally authenticating the user using his email or passowrd. using password we can also authenticate the user using google/facebook login
const User = require('../models/user');
const bcrypt = require('bcrypt')

function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email ,password, done)=>{
            // above usernameField is the unique field through which we want to authenticate the user. here 'email' is the field which is stored in the db
        
        // login process
            // checking if the user email exists
            const user = await User.findOne({email:email});
            if(!user){
                // if user is not present
                return done(null, false, {message: 'No user with the provided email'}); //here we are passing the second attribute as false because we havent found any such ucer
            }
            //  here done is the method we have to return which carries the result of the passport authentication

            // if user is present

            // checking the password
            bcrypt.compare(password, user.password).then(match => {
                if(match){
                    // if password is martched
                    return done(null, user, {message: "Login Successfull"});// here we are passing the second attribute as the 'user' itself as we have found the user
                }
                
                // console.log(messages.error);
                return done(null, false, {message: "Wrong username or password"});

            }).catch(err =>{
                return done(null , false , {message: 'Something went wrong'})
            })

    }))

    // we need to store soemthing in the session so as to identify that whether a particular user is logged in or not, for that we use passport.serializeUser
     passport.serializeUser((user, done)=>{
        // here we get the user which we have passed after successfull bcrypt compare in the done method and also we get the done method itself
        done(null, user._id); //so here we have decided to store the document id of the user from the db in the session in order to identify the user 
    })

    passport.deserializeUser((id, done)=>{
        // here id refers to that entity which we have stored in the session to identify a user, in our case id=_id
             User.findById(id).then( (err, user)=>{

            // here user refers to the user which is recieved to us on matching the findById
            done(err, user); //passing the error if occured any or else the user
            // in this method we have fetched the user
        }).catch(err=>{
            console.log(err);
        })
    })
}

module.exports = init;