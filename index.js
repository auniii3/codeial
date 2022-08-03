const express = require('express');
const app = express();
const port = 8000;

//making server to listen
app.listen(port,function(err){
    if(err){
        //the below way to use variable is called interpolation
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})