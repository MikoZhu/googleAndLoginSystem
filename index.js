const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const authRoute = require("./routes/auth-route")

mongoose.connect("mongodb+srv://HuadanZhu:7788999@cluster0.vngbd6t.mongodb.net/?retryWrites=true&w=majority",
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