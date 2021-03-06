var express = require('express');
var bodyParser = require('body-parser');
var authenticate = require('../authentication');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files'), false);
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter : imageFileFilter})
const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 404;
    res.end('Get opr is not defined for /imageUpload');
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, 
    // upload single file
    upload.single('imageFile'),
    (req, res) => {
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 404;
    res.end('Put opr is not defined for /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 404;
    res.end('Del opr is not defined for /imageUpload');
});
module.exports = uploadRouter;