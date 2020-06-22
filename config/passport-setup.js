const Passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const  twitchStrategy = require("@d-fischer/passport-twitch").Strategy;
require('dotenv').config();
const User = require('../models/user-models');

const api_keys = {
    YoutubeID: process.env.Youtube_ID,
    YouTubeSecret: process.env.YouTube_Secret,
    Twitch_ID: process.env.Twitch_ID,
    Twitch_Secret: process.env.Twitch_Secret
};

// step 5

Passport.serializeUser((user, done) => {

    console.log("3 Serialize User " , user);
done(null, user.id);


});


// step 6 , step 7 goes to Profile-routes.js

Passport.deserializeUser((id, done) => {
    console.log("4 Deserialize User ", id);

    User.findById(id).then((user) =>{

        done(null, user);
    });


});

// step 4 next is serializer and deserializer above

Passport.use (
    new GoogleStrategy ({

//options for passport
        clientID: api_keys.YoutubeID,
        clientSecret : api_keys.YouTubeSecret,
        callbackURL: '/auth/google/redirect/',


}, (accessToken, refreshToken, profile, done) => {

    console.log("5 profile " , profile);
    console.log("5b profile " , profile._json.sub);
   // done(null, profile);
    
    //callback from passport

  //check if user already exists in DB

    User.findOne({

        googleId: profile._json.sub
    }).then((currentUser) =>{

        if(currentUser)
        {
            // already in DB from before
            console.log("5a");
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


/*
============================================
========== Twitch login ====================
============================================
*/

Passport.use (
    new twitchStrategy ({

//options for passport
        clientID: api_keys.Twitch_ID,
        clientSecret : api_keys.Twitch_Secret,
        callbackURL: '/auth/twitch/redirect/',
     

}, (accessToken, refreshToken, profile, done) => {

    console.log("5 profile " , profile);
    console.log("5b profile " , profile.id);
   // done(null, profile);
    
    //callback from passport

  //check if user already exists in DB

    User.findOne({

        TwitchId: profile._json.sub
    }).then((currentUser) =>{

        if(currentUser)
        {
            // already in DB from before
            console.log("5a");
            console.log("Current User is: " + currentUser);
            done(null, currentUser);
        }
        else {
            
    new User ({

        username: profile._json.name,
        TwitchId: profile._json.sub,
        service: 'Twitch'

    }).save().then((newUser) =>{

        console.log("6");
        console.log('new user has been created in db ' + newUser);
        done(null, newUser);
    });


       }
    })



}
));