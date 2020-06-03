
const router = require('express').Router();

const authCheck = (req, res, next) => {

    console.log("6 res" , res);
    if(!req.user){
        console.log("7");
        next();
       
    } else {
        res.redirect('/auth/login');        
    }
};

router.get('/',   (req, res) => {
    console.log("8 req" , req.user);
    
    res.render('profile',  {user: req.user});
    console.log("10");
});

module.exports = router;