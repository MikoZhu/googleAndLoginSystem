const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const authRoute = require("./routes/auth-route")
const profileRoute = require("./routes/profile-route")
require("./config/passport") //passport.js--passport.use has been set
const cookieSession = require("cookie-session")
const passport = require("passport")
const { initialize } = require("passport")

mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connect to mongodb atlas.")
    }).catch((err)=>{
        console.log(err)
    })

// middleware
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieSession({
    keys:[process.env.SECRET],
})
)
app.use(passport.initialize())
app.use(passport.session())
app.use("/auth",authRoute)
app.use("/profile",profileRoute)


app.get("/",(req,res)=>{
    res.render("index")
})



app.listen(8080,()=>{
    console.log("Server is running on 8080.")
})