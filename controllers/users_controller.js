module.exports.profile = function(req,res){
    return res.render('user',{
        title:"Users"
    });
}

module.exports.edit = function(req,res){
    return res.end('<h1>Users Edit Controller</h1>')
}