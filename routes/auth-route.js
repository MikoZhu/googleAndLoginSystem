//handle path of auth 
const router = require("express").Router()
const passport = require("passport")

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/google",(req,res)=>{
    passport.authenticate("google",{
        scope:["profile"], //obtain user's information, can only obtain email as well
    })
})
module.exports = router