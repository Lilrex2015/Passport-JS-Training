const router = require('express').Router();
const passport = require('passport');


//auth login

router.get('/login', (req, res) => {

    res.render('login');

});

router.get('/logout' , (req, res) => {

    // handle with passport
    req.session = null;
    req.logout();
  
    res.redirect('/');
});


/* 

============================================
============================================
============================================

*/

// auth with Google Step 1

router.get('/google', passport.authenticate('google', {

    scope : ['profile']
}),
   
);


// Step 2, Step 3 goes to Passport Setup.js
router.get('/google/redirect/' , passport.authenticate('google'), (req, res) =>{

    console.log("2 req" , req.user);
    res.redirect('/profile/');
    
});



/* 

============================================
========== Twitch login ====================
============================================

*/

router.get('/twitch', passport.authenticate('twitch'));


// Step 2, Step 3 goes to Passport Setup.js
router.get('/twitch/redirect/' , passport.authenticate('twitch', { failureRedirect: "/" }), (req, res) =>{

    console.log("2 req" , req.user);
    res.redirect('/profile/');
    
});



module.exports = router;