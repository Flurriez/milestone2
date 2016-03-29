var express = require('express');
var router = express.Router();
var crypto  = require('crypto');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Today I Learned' });
});
router.get('/login', function(req,res,next){
  res.render('login',{title: 'Login'});
});

router.post('/login',function(req,res,next){
  var sum = crypto.createHash('sha1');

  req.db.driver.execQuery(
    'SELECT * FROM users WHERE email = ?; ',
    [req.body.email],
    function(err,data){
      if(err){console.log(err)}

    sum.update(req.body.password);
    var hashed = sum.digest('hex');

    if(hashed === data[0].password)
    {
      res.cookie('username',data[0].name);
      res.redirect('/entries/');
    }
    else
    {
      res.redirect('/login');
    }
  }
  );
});
module.exports = router;
