/* Controller: controller consists of many actions */
/*
    to create action
    module.exports.actionName = function(req,res){}
*/

module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codeial</h1>')
}

module.exports.about = function(req,res){
    return res.end('<h1>About Controller</h1>')
}