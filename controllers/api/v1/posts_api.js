const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
            .sort("-createdAt")
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }).sort("-createdAt");

    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
        console.log(post.user + " hello " + req.params.id);
        if(post.user == req.user.id){
            await post.remove();
            await Comment.deleteMany({post:req.params.id});
           
            return res.status(200).json({
                message:"Posts and associated comments deleted successfully!"
            });
        }
        else{
            return res.status(401).json({
                message:'You cannot delete this post!'
            });
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal Server Error",
        });
    }
}