const mongoose = require("mongoose")
const postSechma = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    author:String,
})

module.exports = mongoose.model("Post",postSechma)