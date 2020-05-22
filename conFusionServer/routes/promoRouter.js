const express      =        require('express');
const promoRouter   =        express.Router();
const authenticator = require('../authentication');
promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will send all te promoes to you!');
})

.post(authenticator.verifyUser, (req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put(authenticator.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /promoes');
})
.delete(authenticator.verifyUser, (req, res, next) => {
    res.end('Delete all request');
});


promoRouter.route('/:promoId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will send Details of ' + req.params.promoId + ' promo');
})
.post(authenticator.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Post not defined for promo: ' + req.params.promoId);
})
.put(authenticator.verifyUser, (req, res, next) => {
    res.statusCode = 202;
    res.end('promo will be put with id = ' + req.params.promoId + ' with details ' + req.body.name + ' ' + req.body.description);
})
.delete(authenticator.verifyUser, (req, res, next) => {
    res.end('Delete ' + req.params.promoId + ' request');
});

module.exports = promoRouter;
