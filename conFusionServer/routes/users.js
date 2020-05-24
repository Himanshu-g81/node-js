var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authentication');
var config = require('../config');
var authenticator = require('../authentication');

router.use(bodyParser.json());
/* GET users listing. */
router.get('/', authenticator.verifyUser, authenticator.verifyAdmin, function(req, res, next) {
  User.find({})
  .then((users) => {
    console.log(users);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/signup', function(req, res, next) {
  User.register(new User({username:req.body.username}), req.body.password, (err, user) => {
    if(err) {
      res.status = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    } 
    else {
      if(req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if(req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      user.save((err, user) => {
          if(err) {
            res.status = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return;
          }
          passport.authenticate('local')(req, res, () => {
          res.status = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
      
    }
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
        var token = authenticate.getToken({_id: req.user._id});
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, token: token, status: 'Login Successful!'});
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
