const express      =        require('express');
const dishRouter   =        express.Router();
const authenticater = require('../authentication');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

dishRouter.route('/')
.get((req, res, next) => {
    Dishes.find({})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticater.verifyUser, (req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticater.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /dishes');
})
.delete(authenticater.verifyUser, (req, res, next) => {
    Dishes.remove({})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err)); 
});


dishRouter.route('/:dishId')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticater.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Post not defined for dish: ' + req.params.dishId);
})
.put(authenticater.verifyUser, (req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {new : true})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticater.verifyUser, (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
});



dishRouter.route('/:dishId/comments')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments);
        } 
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticater.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null) {
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticater.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /dishes/comments');
})
.delete(authenticater.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null) {
            var promises = [];

            dish.comments.forEach(element => {
                dish.comments.id(element._id).remove();
            })
            
            
                    dish.save()
                    .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
                }, (err) => next(err))
            .catch((err) => next(err));
            
            
        } else {
            err = new Error('Dish ' + req.params.dishId + ' not found.');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err)); 
});




dishRouter.route('/:dishId/comments/:commentId')
.get((req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        } 
        else if(dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        } else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticater.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('Post not defined for comment: ' + req.params.commentId);
})
.put(authenticater.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId) != null) {
            if(req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if(req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments.id(req.params.commentId));
            }, (err) => next(err))
            .catch((err) => next(err));
        } 
        else if(dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        } else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticater.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish != null && dish.comments.id(req.params.commentId)) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish.comments);
            }, (err) => next(err))
            .catch((err) => next(err));
            
        } 
        else if(dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.statusCode = 404;
            return next(err);
        } else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
});

module.exports = dishRouter;