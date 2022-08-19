/* Controller: controller consists of many actions */
/*
    to create action
    module.exports.actionName = function(req,res){}
*/

module.exports.home = function(req,res){
    return res.render('home',{
        title:"Home"
    })
}

module.exports.about = function(req,res){
    return res.end('<h1>About Controller</h1>')
}