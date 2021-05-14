"use strict";

var homePosts;
const Post = require("../models/post");

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
    indexView: (req, res) => {
        res.render("posts/index");
    },
    homeView:(req,res) =>{
        res.render("/home");
    },
    new: (req, res) => {
        res.render("posts/new");
    },

    create: (req, res, next) => {
        let newPost = new Post({

            description: req.body.description,

        });
        Post.create(newPost)
            .then(post => {
                res.locals.post = post;
                res.locals.redirect = "/home";
                next();
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                next(error)
            })
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath != undefined) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let postId = req.params.id;
        Post.findById(postId)
            .then(post => {
                res.locals.post = post;
                next();
            })
            .catch(error => {
                console.log(`Error gathering post by ID: ${error.message}`);
                next(error)
            })
    },

    showView: (req, res) => {
        res.render("posts/show");
    },
    edit: (req, res, next) => {
        let postId = req.params.id;
        Post.findById(postId)
            .then(post => {
                res.render("posts/edit", { post: post });
            })
            .catch(error => {
                console.log(`Error gathering post by ID: ${error.message}`);
                next(error);
            })
    },

    update: (req, res, next) => {
        let postId = req.params.id;
        let updatedPost = new Post({

            description: req.body.description,
            _id:post

        });

        Post.findByIdAndUpdate(postId, updatedPost)
            .then(post => {
                res.locals.post = post;
                res.locals.redirect = `/posts/${post._id}`;
                next();
            })
            .catch(error => {
                console.log(`Error gathering post by ID: ${error.message}`);
                next(error);
            })
    },

    delete: (req, res, next) => {
        let postId = req.params.id;
        Post.findByIdAndRemove(postId)
            .then(() => {
                res.locals.redirect = "/posts";
                next();
            })
            .catch(error => {
                console.log(`Error gathering post by ID: ${error.message}`);
                next(error);
            })
    }
}