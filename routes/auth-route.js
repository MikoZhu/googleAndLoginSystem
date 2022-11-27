//handle path of auth 
const router = require("express").Router()
const passport = require("passport")

router.get("/login",(req,res)=>{
    res.render("login",{user:req.user})
})
router.get("/logout",(req,res)=>{
    req.logOut()
    res.redirect("/")
})

router.get("/google",passport.authenticate("google",{
    scope:["profile","email"],
    prompt:"select_account",
}))

router.get("/google/redirect", passport.authenticate("google"),(req,res)=>{
    // log in successfully
    res.redirect("/profile")
})

module.exports = router