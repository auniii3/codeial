const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.use(express.static('./assets'));
// use express router and it automatically fetches index.js
app.use('/',require('./routes'));

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

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