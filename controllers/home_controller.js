/* Controller: controller consists of many actions */
/*
    to create action
    module.exports.actionName = function(req,res){}
*/
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    // console.log(req.cookies)
    // res.cookie('user_id',25)
    // Post.find({},function(err,post){
    //     if(err){
    //         console.log("Error in finding Posts");
    //     }

    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts: post
    //     })
    // })

    //Pre populate the user for each post

    try {
        let posts = await Post.find({})
            .sort("-createdAt")
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }).sort("-createdAt");

        let users = await User.find({});
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    } catch (err) {
        console.log("Error in finding Posts"); 
        return;
    }
    //using async await to reduce the code complexity and optimization


    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec(function (err, posts) {
            if (err) {
                console.log("Error in finding Posts"); return;
            }
            User.find({}, function (err, users) {
                return res.render('home', {
                    title: "Codeial | Home",
                    posts: posts,
                    all_users: users
                });
            });

        })



}

module.exports.about = function (req, res) {
    return res.end('<h1>About Controller</h1>')
}