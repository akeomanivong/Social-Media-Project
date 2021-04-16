const express= require("express"), app=express(),
    homeController=require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    usersController = require("./controllers/usersController"),
    layouts = require("express-ejs-layouts"),mongoose=require("mongoose");



mongoose.connect("mongodb://localhost:27017/SocialMediaProject",
    {useNewUrlParser:true});

app.set("port", process.env.PORT ||3000);

// app.get("/", (req,res) =>{
//     res.send("Welcome!");
// });

app.set("view engine", "ejs");
app.use(layouts);

app.get("/", homeController.showIndex);

app.use(express.static("public"))
app.use(
    express.urlencoded({
        extended:false
    })
);


app.use(express.json());

app.get("/friends",homeController.showFriends);
app.get("/homepage",homeController.showHomepage);
app.get("/users", usersController.getAllUsers);
app.get("/signin",homeController.getSignin);
app.get("/signup", usersController.getUsersPage);
app.post("/user",usersController.saveUser);



app.use(errorController.pageNotFoundError);
app.use(errorController.interalServerError);

app.listen(app.get("port"), () =>{
    console.log(`Server is running on port: ${app.get("port")}`)

});