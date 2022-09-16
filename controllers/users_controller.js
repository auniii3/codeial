const Users = require('../models/user');

// module.exports.profile = function(req,res){
//     let id = req.cookies.user_id;
//     if(id){
//         Users.findById(id,function(err,user){
//             if(err){console.log("error in finding user by id"); return;}
//             if(user)
//             {
//                 return res.render('user',{
//                     title:"User Profile",
//                     user:user
//                 });
//             }
         
           
//         })
//     }else{
//         return res.redirect('/users/sign-in');
//     }
// };

module.exports.profile = function(req,res){
    let userId = req.params.id;
    Users.findById(userId,function(err,user){
        return res.render('user',{
            title:"User Profile",
            profile_user: user
        })
    })
   
}

module.exports.updateUser = function(req,res){
    if(req.params.id == req.user.id){
        Users.findByIdAndUpdate(req.params.id,
           req.body,
            function(err,user){
                return res.redirect('/');
        })
    }
    else{
        return res.status(401).send('Unauthorized');
    }
    
}

//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
};

//render the sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    Users.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user in signing up");
            return;
        }
        if(!user){
            Users.create(req.body,function(err,user){
                if(err){
                    console.log("error in creating user while signing up");
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

//sign in and create a session for the user with Manual Authentication
// module.exports.createSession = function(req,res){

//     //steps to authenticate
//     //find the user
//     Users.findOne({email:req.body.email},function(err,user){
//         if(err){
//             console.log("error in finding user while signing in")
//         }
//         //handle user found
//         if(user){
//             //handle password doesn't match
//             if(user.password != req.body.password){
//                 return res.redirect('back');
//             }
//             //handle session creation
//             res.cookie('user_id',user.id);
//             return res.redirect('/users/profile');
//         }
//         else{
//             //handle user not found
//             res.redirect('back');
//         }
//     })
// }

module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/')
}

//sign out for the user
module.exports.destroySession = function(req,res){
    //logout function is provided by passport js
    req.logout(function(err){
        if(err)
        {   
            return res.redirect('/users/sign-in');
        }
    });
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
    
}