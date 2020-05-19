const express      =        require('express');
const dishRouter   =        express.Router();

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will send all te dishes to you!');
})
.post((req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Delete all request');
});


dishRouter.route('/:dishId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.statusCode = 200;
    res.end('Will send Details of ' + req.params.dishId + ' dish');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post not defined for dish: ' + req.params.dishId);
})
.put((req, res, next) => {
    res.statusCode = 202;
    res.end('Dish will be put with id = ' + req.params.dishId + ' with details ' + req.body.name + ' ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Delete ' + req.params.dishId + ' request');
});

module.exports = dishRouter;
