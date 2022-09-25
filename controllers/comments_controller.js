const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            comment = await comment.populate('user');
            post.comments.push(comment);
            post.save();
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment
                    },
                    message: "Comment Added"
                })
            }
        }
        return res.redirect('/');
    }
    catch (err) {
        console.log("Error in adding comment");
        return;
    }

    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                //handle error
                if (err) {
                    console.log("Error in adding comment");
                }
                //inserting comment in the post it will automatically fetch the id and insert
                post.comments.push(comment);
                //need to save it whenever we are updating in mongodb
                post.save();

                res.redirect('/');
            });
        }
    });
}

module.exports.destroy = async function (req, res) {
    try {
        
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id || comment.post == req.user.id) {
            
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,
                { $pull: { comments: req.params.id } });

                if(req.xhr){
                    return res.status(200).json({
                        data:{
                            comment_id:req.params.id
                        },
                        message:"Comment Deleted"
                    });
                }
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }   
    } catch (err) {
        console.log("Error", err);
        return;
    }

    Comment.findById(req.params.id, function (err, comment) {
        if (comment.user = req.user.id || comment.post == req.user.id) {
            let postId = comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
                return res.redirect('back');
            })

        } else {
            return res.redirect('back');
        }
    })
}