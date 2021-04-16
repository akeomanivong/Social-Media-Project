const mongoose = require("mongoose"),
    userSchema=mongoose.Schema({
        fname: String,
        lname: String,
        username: String,
        gender: String,
        location: String,
        email: String,
        namepassword: String,
        namepasswordConfirm: String,
        dob: String,
        questions: String,
        question1: String,
        namebio: String
    });
module.exports=mongoose.model("User", userSchema);