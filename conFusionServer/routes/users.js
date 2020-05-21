var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function(req, res, next) {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null) {
      var err = new Error('User ' + req.body.username + ' already there');
      err.status = 403;
      next(err);
    } 
    else {
      console.log(req.body.username, req.body.password)
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
      .then((user) => {
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({status: 'Registration Successful!', user: user});
      })
      .catch((err) => next(err));
    }
  })
  .catch((err) => next(err));
});

router.post('/login', function(req, res, next) {
  console.log(req.signedCookies);
  if(!req.session.user) {
    var authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
  }

  // ' ' for Basic base64Encodding
  // colon to seprate user name and password
  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var username = auth[0];
  var password = auth[1];
  console.log(username, password);
  User.findOne({username: username})
  .then((user) => {
    if(user == null) {
      var err = new Error('User ' + username + ' not defined');
      err.status = 403;
      return next(err);
    }
    else if(user.password != password) {
      var err = new Error('Password not match');
      err.status = 403;
      return next(err);
    } 
    else {
      req.session.user = 'authenticated';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('You are authenticated');
    }
    
  })
  .catch((err) => next(err));
}

  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated');
  }
});


router.get('/logout', (req, res) => {
  console.log(req.session);
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('You are not loggedin');
    err.status = 403;
    next(err);
  }
});
module.exports = router;
