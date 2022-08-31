const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
   Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                //handle error

                //inserting comment in the post it will automatically fetch the id and insert
                post.comments.push(comment);
                //need to save it whenever we are updating in mongodb
                post.save();

                res.redirect('/');
            });
        }
   }); 
}