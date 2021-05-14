
const Post = require("../models/post");

// exports.showFriends =(req,res) => {
//     res.render("friends",{listedFriends:friends});
// }

// exports.getSignin =(req,res) => {
//     res.render("signin");
// }

// exports.showIndex = (req, res) => {
//     res.render("index");
// }
// exports.showHomepage = (req, res) => {
//     res.render("homepage");
// }

// exports.showSignUp = (req, res) => {
//     res.render("signup");
// }


// exports.getPosts = (req,res) =>{
//     Post.find()
//             .then(posts => {
//                 res.locals.posts = posts;
//                 homePosts=posts;
//                 console.log(homePosts)
//                 next()
//             })
//             .catch(error => {
//                 console.log(`Error gathering post data: ${error.message}`)
//                 next(error);
//             })
// }


module.exports = {
    index: (req, res, next) => {
        Post.find()
            .then(posts => {
                res.locals.posts = posts;
                homePosts=posts;
                //console.log(homePosts)
                next()
            })
            .catch(error => {
                console.log(`Error gathering post data: ${error.message}`)
                next(error);
            })
    },
    showFriends: (req,res) =>{
        res.render("friends",{listedFriends:friends});
    },
    getFriends:(req,res) =>{

    },
    getLogin: (req,res) =>{
        res.render("login");
    },
    showIndex: (req,res) =>{
        res.render("index");
    },
    showHomepage: (req,res) =>{
        res.render("homepage",{listedFriends:friends});
    },
    showSignUp: (req,res) =>{
        res.render("signup")
    },
    showNotifications: (req,res) =>{
        res.render("notifications",{listedFriends:friends});
    }
}