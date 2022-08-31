const Post = require('../models/post');

module.exports.posts = function(req,res){
    return res.end('<h1>Posts Controller</h1>')
}

module.exports.addPosts = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log("Error in creating a post."); return;
        }
        return res.redirect('back');
    });

    
}

