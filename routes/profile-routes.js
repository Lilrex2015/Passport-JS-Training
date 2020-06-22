
const router = require('express').Router();

const authCheck = (req, res, next) => {

    console.log("6 req" , req.route);
    if(req.user){
        console.log("7");
        next();
       
    } else {
        res.redirect('/auth/login');        
    }
};


// step 7
router.get('/',  authCheck, (req, res) => {
    console.log("8 req", req.user);
    
    
    res.render('profile',  {user: req.user.username});
    console.log("10");
});

module.exports = router;