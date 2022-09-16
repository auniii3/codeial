const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.posts = function(req,res){
    return res.end('<h1>Posts Controller</h1>')
}

module.exports.addPosts = async function(req,res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if(req.xhr){
            console.log(post);
            return res.status(200).json({
                data:{
                    post: post
                },
                
                message:"Post Created!"
            })
        }

        req.flash('success',"Post added Successfully.");
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
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
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted"
                });
            }
            req.flash('success','Post and associated Comments removed successfully.');
            return res.redirect('back');
        }
        else{
            req.flash('error','Not Authorized to delete the post.');
            return res.redirect('back');
        }
    }
    catch(err){
        req.flash('error',err);
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

