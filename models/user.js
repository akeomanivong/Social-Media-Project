"use strict";

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const mongoose = require("mongoose"),
    { Schema } = require("mongoose"),
    userSchema = mongoose.Schema({
            txtFirstName: {
                    type: String,
                    required: true
            },
            txtLastName: {
                    type: String,
                    required: true
            },
            txtUsername: {
                    type: String,
                    required: true,
                    unique: true
            },
            gender: {
                    type: String,
                    required: true
            },
            txtLocation: {
                    type: String,
                    required: true
            },
            txtEmail: {
                    type: String,
                    required: true,
                    unique: true
            },
            txtPassword: {
                    type: String,
                    required: true,
            },
            txtDob: {
                    type: String,
                    required: true
            },
            ddQuestion: {
                    type: String,
                    required: true
            },
            txtAnswer: {
                    type: String,
                    required: true
            },
            txtBio: {
                    type: String,
                    required: true
            },
    })

userSchema.methods.getInfo = function () {
        return `FirstName: ${this.txtFirstName} LastName ${this.txtLastName} Username ${this.txtUsername} Gender ${this.gender} Location ${this.txtLocation} 
    Email ${this.txtEmail} Password ${this.txtPassword} dob ${this.txtDob} Question ${this.ddQuestion} Answer ${this.txtAnswer} NameBio ${this.txtBio}`;
}

userSchema.plugin(passportLocalMongoose, {
        usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);