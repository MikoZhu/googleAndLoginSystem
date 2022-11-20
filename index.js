const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const authRoute = require("./routes/auth-route")
require("./config/passport") //passport.js--passport.use has been set

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
app.use("/auth",authRoute)

app.get("/",(req,res)=>{
    res.render("index")
})



app.listen(8080,()=>{
    console.log("Server is running on 8080.")
})