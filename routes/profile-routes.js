
const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(req.user){
        console.log("7");
        next();
       
    } else {
        res.redirect('/auth/login');        
    }
};

router.get('/',  (req, res) => {
    console.log("8");
    res.render('profile',  {user: req.user});
});

module.exports = router;