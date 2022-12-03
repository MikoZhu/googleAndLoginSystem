const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/user-model")
const LocalStrategy = require("passport-local")
const bcrypt =require("bcrypt")

// req.user
// req.logout()
// req.isAuthenticated()


passport.serializeUser((user,done)=>{
    console.log("Serializing user now")
    done(null, user._id)
})

passport.deserializeUser((_id,done)=>{
    console.log("Deserializing user now")
    User.findById({_id}).then((user)=>{
        console.log("Found User")
        done(null,user)
    })
})
passport.use(new LocalStrategy((username,password,done)=>{
    console.log(username,password,done)
    User.findOne({email:username}).then(async(user) =>{
        if(!user){
            return done(null,false)
        }
        await bcrypt.compare(password,user.password,function(err,result){
            if (err){
                return done(null,false)
            }
            if (!result){
                return done(null,false)
            }else{
                return done(null,user)
            }
        })
    }).catch((err) =>{
        return done(null,false)
    })
 })
)

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/auth/google/redirect",
},
    (accessToken,refreshToken,profile,done)=>{
        console.log(profile)
        // passport callback, passportjs => configure strategy => function 4 prams
        User.findOne({googleID:profile.id}).then ((foundUser)=>{
            if(foundUser){
                console.log(foundUser)
                console.log("User already exist.")
                done(null,foundUser)
            }else {
                new User({
                    name:profile.displayName,
                    googleID:profile.id,
                    thumbnail:profile.photos[0].value,
                    email:profile.emails[0].value,
                })
                .save()
                .then((newUser)=>{
                    console.log(newUser)
                    console.log("New user created.")
                    done(null,newUser)
                })
            }
            
        })
    })
)