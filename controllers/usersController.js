const User = require("../models/user");

exports.getAllUsers = (req, res) => {
    User.find({})
        .exec()
        .then(users => {
            res.render("users", { users: users })
        })
        .catch((error) => {
            console.log(error);
            return [];
        })
        .then(() => {
            console.log("promise complete")
        })


};


exports.getUsersPage = (req, res) => {
    res.render("signup");
}

exports.saveUser = (req, res) => {
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        gender: req.body.gender,
        location: req.body.location,
        email: req.body.email,
        namepassword: req.body.namepassword,
        namepasswordConfirm: req.body.namepasswordConfirm,
        dob: req.body.dob,
        questions: req.body.questions,
        question1: req.body.question1,
        namebio: req.body.namebio
    });
    newUser.save()
        .then(()=>{
            res.render("thanks")
        })
        .catch(error=>{res.send(error)});
}