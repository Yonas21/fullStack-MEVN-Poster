//setup the router for the CRUD operations
/* eslint-disable */
const express = require('express');
let postRouter = express.Router();

//get the post model in our route
let Post = require('./post.model');


//create the new post / Create
postRouter.route('/add').post(function (req,res) {
    let post = new Post(req.body);

    //save the content to the database
    post.save().then(()=>{
        //saved successfully
        res.status(200).json('Post Saved Successfully.')
    }).catch(()=> {
        res.status(400).json('Unable to save to the database.')
    });
});

//define the end point for the find the data.//Find
postRouter.route('/').get(function (req,res) {
    Post.find(function (err,posts) {
        if (err){
            res.json(err);
        }
        res.json(posts);
    });
});

//edit Route

postRouter.route('/edit/:id').get((req,res)=>{
    let id = req.params.id;
    Post.findById(id, function (err,post) {
        if (err){
            res.json(err);
        }
        res.json(post)
    });
});

//define the update Route
postRouter.route('/update/:id').post(function (req,res) {
    let id  = req.params.id;
   Post.findById(id, function (err,post) {
       if (!post){
           res.status(404).send("data not found");
       }
       post.title = req.body.title;
       post.body = req.body.body;
       post.save().then(()=>{
           res.json("Update Completed");
       })
           .catch(()=>{
               res.json("unable to update.");
           });
   });
});


//delete the post if its unwanted
postRouter.route('/delete/:id').delete(function (req,res) {
    Post.findByIdAndRemove({_id: req.params.id},function (err) {
        if (err){
            res.json(err);
        }
        res.json('Successfully Removed.')
    });
});

//we need to export
module.exports = postRouter;

