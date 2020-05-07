const express = require('express');
const authRoutes = require('./routes/auth-routes.js');
const profileRoutes = require('./routes/profile-routes.js');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv').config();

const app = express();



// setup view engine

app.set('view engine', 'ejs');

app.use(cookieSession({

maxAge: 24 *60 * 60 * 1000,
keys:'thisisatestcookiekey'

}));

// initalize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to monogdb
mongoose.connect(process.env.dbURI2, { useNewUrlParser: true ,  useUnifiedTopology: true }, () =>{

    console.log("Connected to mongo");
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
//create home route

app.get('/' , (req, res) => {

res.render('home');


});

app.listen(3000, () => {

 
console.log('app now listening to port 3000');

});

