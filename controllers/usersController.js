"use strict";

const User = require("../models/user"),
    httpStatus = require("http-status-codes"),
    getUserParams = body => {
        return {
            txtFirstName: body.txtFirstName,
            txtLastName: body.txtLastName,
            txtUsername: body.txtUsername,
            gender: body.gender,
            txtLocation: body.txtLocation,
            txtEmail: body.txtEmail,
            txtPassword: body.txtPassword,
            txtDob: body.txtDob,
            ddQuestion: body.ddQuestion,
            txtAnswer: body.txtAnswer,
            txtBio: body.txtBio
        };
    };
const passport = require("passport");


module.exports = {
    getAllUsers: (req, res) => {
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


    },
    getUsersPage: (req, res) => {
        res.render("signup");
    },
    saveUser: (req, res) => {
        let newUser = new User({
            txtFirstName: req.body.txtFirstName,
            txtLastName: req.body.txtLastName,
            txtUsername: req.body.txtUsername,
            gender: req.body.gender,
            txtLocation: req.body.txtLocation,
            txtEmail: req.body.txtEmail,
            txtPassword: req.body.txtPassword,
            txtDob: req.body.txtDob,
            ddQuestion: req.body.ddQuestion,
            txtAnswer: req.body.txtAnswer,
            txtBio: req.body.txtBio
        });
        newUser.save()
            .then(() => {
                res.render("saved")
            })
            .catch(error => { res.send(error) });
    },

    login: (req, res) => {
        res.render("users/login")
    },

    index: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                //homeUsers = users;
                //console.log(homeUsers)
                next()
            })
            .catch(error => {
                console.log(`Error gathering user data: ${error.message}`)
                next(error);
            })
    },
    indexView: (req, res) => {
        res.render("users/index");
    },
    homeView: (req, res) => {
        res.render("/home");
    },
    new: (req, res) => {
        res.render("users/new");
    },

    create: (req, res, next) => {
        if(req.skip) return next();
        let userParams = getUserParams(req.body);
        let newUser = new User(userParams);

        User.register(newUser, req.body.txtPassword,(error,user) =>{
            if(user){
                req.flash("success", "User account successfully created");
                res.locals.redirect = "/users";
                next();
            }
            else{
                req.flash("error", `Failed to create user account: ${error.message}`);
                res.locals.redirect = "/signup";
                next();
            }
        })

    },


    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();

        req.check("email", "Email is not valid!").isEmail();
        // req.check("zipCode", "Zip Code is not valid!").notEmpty().isInt().isLength({
        //     min: 5,
        //     max: 5
        // });
        req.check("password", "Password can not be empty").notEmpty();
        req.getValidationResult().then((error) => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg);
                req.flash("error", messages.join(" and "));
                req.skip = true;
                res.local.redirect = "/users/new";
                next();
            }
            else next();
        });
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "Login failed! Check your username, password, or email",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),

    logout: (req, res, next) => {
        req.logout();
        req.flash("success", "You have been logged out");
        res.locals.redirect = "/";
        next();
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error gathering user by ID: ${error.message}`);
                next(error)
            })
    },

    showView: (req, res) => {
        res.render("users/show");
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/edit", { user: user });
            })
            .catch(error => {
                console.log(`Error gathering user by ID: ${error.message}`);
                next(error);
            })
    },

    update: (req, res, next) => {
        let userId = req.params.id;
        let updatedUser = new User({

            txtFirstName: req.body.txtFirstName,
            txtLastName: req.body.txtLastName,
            txtUsername: req.body.txtUsername,
            gender: req.body.gender,
            txtLocation: req.body.txtLocation,
            txtEmail: req.body.txtEmail,
            txtPassword: req.body.txtPassword,
            txtDob: req.body.txtDob,
            ddQuestion: req.body.ddQuestion,
            txtAnswer: req.body.txtAnswer,
            txtBio: req.body.txtBio,
            _id: userId

        });

        User.findByIdAndUpdate(userId, updatedUser)
            .then(user => {
                res.locals.user = user;
                res.locals.redirect = `/users/${user._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error gathering user by ID: ${error.message}`);
                next(error);
            })
    },

    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/users";
                next();
            })
            .catch(error => {
                console.log(`Error gathering user by ID: ${error.message}`);
                next(error);
            })
    },
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.OK,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },
    join: (req, res, next) => {
        let userId = req.params.id,
            currentUser = req.user;
        if (currentUser) {
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    users: userId
                }
            })
                .then(() => {
                    res.locals.success = true;
                    next();
                })
                .catch(error => {
                    next(error);
                });
        } else {
            next(new Error("User must log in."));
        }
    }
}
