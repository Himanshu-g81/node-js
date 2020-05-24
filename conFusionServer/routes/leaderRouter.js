const express      =        require('express');
const leaderRouter   =        express.Router();
var authenticator = require('../authentication');
leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will send all te leaderes to you!');
})
.post(authenticator.verifyUser, authenticator.verifyAdmin, (req, res, next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put(authenticator.verifyUser, authenticator.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /leaderes');
})
.delete(authenticator.verifyUser, authenticator.verifyAdmin, (req, res, next) => {
    res.end('Delete all request');
});


leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will send Details of ' + req.params.leaderId + ' leader');
})
.post(authenticator.verifyUser, authenticator.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('Post not defined for leader: ' + req.params.leaderId);
})
.put(authenticator.verifyUser, authenticator.verifyAdmin, (req, res, next) => {
    res.statusCode = 202;
    res.end('leader will be put with id = ' + req.params.leaderId + ' with details ' + req.body.name + ' ' + req.body.description);
})
.delete(authenticator.verifyUser, authenticator.verifyAdmin, (req, res, next) => {
    res.end('Delete ' + req.params.leaderId + ' request');
});

module.exports = leaderRouter;
