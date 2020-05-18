const express      =        require('express');
const promoRouter   =        express.Router();

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
.post((req, res, next) => {
    res.end('Will add the promo: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /promoes');
})
.delete((req, res, next) => {
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
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post not defined for promo: ' + req.params.promoId);
})
.put((req, res, next) => {
    res.statusCode = 202;
    res.end('promo will be put with id = ' + req.params.promoId + ' with details ' + req.body.name + ' ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Delete ' + req.params.promoId + ' request');
});

module.exports = promoRouter;
