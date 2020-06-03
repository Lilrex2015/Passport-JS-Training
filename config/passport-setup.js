const Passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../models/user-models');

const api_keys = {
    YoutubeID: process.env.Youtube_ID,
    YouTubeSecret : process.env. YouTube_Secret,
};

Passport.serializeUser((user, done) => {

    console.log("3");
done(null, user.id);


});

Passport.deserializeUser((id, done) => {
    console.log("4");

    User.findById(id).then((user) =>{

        done(null, user);
    });


});



Passport.use (
    new GoogleStrategy ({

//options for passport
        clientID: api_keys.YoutubeID,
        clientSecret : api_keys.YouTubeSecret,
        callbackURL: '/auth/google/redirect/',


}, (accessToken, refreshToken, profile, done) => {
    
    //callback from passport

  //check if user already exists in DB

    User.findOne({

        googleId: profile._json.sub
    }).then((currentUser) =>{

        if(currentUser)
        {
            // already in DB from before
            console.log("5");
            console.log("Current User is: " + currentUser);
            done(null, currentUser);
        }
        else {
            
    new User ({

        username: profile._json.name,
        googleId: profile._json.sub,
        service: 'Google'

    }).save().then((newUser) =>{

        console.log("6");
        console.log('new user has been created in db ' + newUser);
        done(null, newUser);
    });


        }
    })



}
));