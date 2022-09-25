const express = require('express');
const cookieParser = require('cookie-parser');
//this is for layouts
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie   
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogleOauth = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const app = express();
const port = 8000;

//converting scss to css before laoding into the server
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))


app.use(expressLayouts);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//specify the layout file name if it is other than layout
// app.set('layout','layout1')
//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deploying in production mode (this secret is used to encrypt cookie)
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1/codeial_development",
        autoRemove: 'disabled'
    },
        function (err) {
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

//init passport in every route call
app.use(passport.initialize());
//enables passport to use "express-session"
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router and it automatically fetches index.js
app.use('/', require('./routes'));

//making server to listen
app.listen(port, function (err) {
    if (err) {
        //the below way to use variable is called interpolation
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
})