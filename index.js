const express = require('express');
const app = express();
const port = 8000;

// use express router and it automatically fetches index.js
app.use('/',require('./routes'))

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views')

//making server to listen
app.listen(port,function(err){
    if(err){
        //the below way to use variable is called interpolation
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})