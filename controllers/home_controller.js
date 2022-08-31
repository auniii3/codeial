/* Controller: controller consists of many actions */
/*
    to create action
    module.exports.actionName = function(req,res){}
*/
const Post = require('../models/post');

module.exports.home = function(req,res){
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
    Post.find({})
    .populate('user')
    .exec(function(err,posts){
        if(err){
            console.log("Error in finding Posts");
        }
        return res.render('home',{
            title:"Codeial | Home",
            posts: posts
        });
    })
    
    
}

module.exports.about = function(req,res){
    return res.end('<h1>About Controller</h1>')
}