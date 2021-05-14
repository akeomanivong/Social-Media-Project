"use strict";

const express= require("express"), app=express(),
    app = express(),
    router = express.Router(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    usersController = require("./controllers/usersController"),
    postsController = require("./controllers/postsController"),
    layouts = require("express-ejs-layouts"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    cookieParser = require("cookie-parser"),
    expressSession = require("express-session"),
    expressValidator = require("express-validator"),
    connectFlash = require("connect-flash"),
    User = require("./models/user");

mongoose.Promise = global.Promise;

mongoose.connect( process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});

app.set("port", process.env.PORT ||3000);
app.set("view engine", "ejs");

router.use(express.static("public"));
router.use(layouts);
router.use(expressValidator());
router.use(
    express.urlencoded({
        extended: false
    })
);

router.use(methodOverride("_method", { methods: ['POST', 'GET'] }));

router.use(express.json());

router.use(cookieParser("my_passcode"));
router.use(expressSession({
    secret: "my_passcode",
    cookie: {
        maxAge: 400000
    },
    resave: false,
    saveUninitialized: false
}));


router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.use(connectFlash());

router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
})

router.get("/", homeController.index);


router.get("/", homeController.index, homeController.showIndex);


//Posts
router.post("/post", postsController.create, postsController.redirectView, postsController.index);
router.get("/posts", postsController.index, postsController.indexView)
router.get("/posts/new", postsController.new);
router.get("/posts/:id", postsController.show, postsController.showView);
router.get("/posts/:id/edit", postsController.edit);
router.put("/post/:id/update", postsController.update, postsController.redirectView);
router.delete("/posts/:id/delete", postsController.delete, postsController.redirectView);

//Users
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/user", usersController.create, usersController.redirectView);

router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get("/users/logout", usersController.logout, usersController.redirectView);


router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/api/users", usersController.index, usersController.respondJSON);
router.get("/users/:id/join", usersController.join, usersController.respondJSON);
router.use(usersController.errorJSON);

//router.get("/users", usersController.index,usersController.indexView);
router.get("/login", homeController.getLogin);
router.get("/signup", usersController.getUsersPage);
// router.post("/user",usersController.saveUser);



router.use(errorController.pageNotFoundError);
router.use(errorController.interalServerError);

app.use("/", router);

const server = app.listen(app.get("port"), () => {
    console.log(`Server is running on port at http://localhost:${app.get("port")}`)

});