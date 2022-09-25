const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.posts = function(req,res){
    return res.end('<h1>Posts Controller</h1>')
}

module.exports.addPosts = async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        let newPost = await post.populate({
            path:'user',
            select:'name'
        });
        req.flash('success',"Post added Successfully.");
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: newPost
                },
                message:req.flash('success')
            })
        }
        
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        if(req.xhr){
            return res.status(500).json({
                message: req.flash('error')
            });
        }
        return res.redirect('back');
    }
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

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user = req.user.id){
            await post.remove();
            await Comment.deleteMany({post:req.params.id});

            req.flash('success','Post and associated Comments removed successfully.');

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message: req.flash('success')
                });
            }
            
            return res.redirect('back');
        }
        else{
            req.flash('error','Not Authorized to delete the post.');
            if(req.xhr){
                return res.status(500).json({
                    message: req.flash('error')
                });
            }
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
        if(req.xhr){
            return res.status(500).json({
                message: req.flash('error')
            });
        }
        return res.redirect('back');
    }
    
    Post.findById(req.params.id,function(err,post){
        //.id means converting the ObjectId to string
        if(post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}

