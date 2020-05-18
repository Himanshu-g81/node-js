const express =           require('express');
const http    =           require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const hostname = "localhost";
const port = 3000;
const app = express();

app.use(morgan('dev'));
const dishRouter =            require('./routes/dishRouter');
const leaderRouter =  require('./routes/leaderRouter');
const promoRouter =   require('./routes/promoRouter');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promo', promoRouter);
/*
app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h3>This is an Express Server</h1></body></html>');
});*/

/*
app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.end('Will send all te dishes to you!');
    next();
});

app.post('/dishes', (req, res, next) => {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res, next) => {
    res.statusCode = 403;
    res.end('Put operation not supported on /dishes');
});

app.delete('/dishes', (req, res, next) => {
    res.end('Delete all request');
});


app.get('/dishes:dishId', (req, res, next) => {
    res.statusCode = 200;
    res.end('Will send all te detail of ' + req.params.dishId + ' to you');
    next();
});

app.post('/dishes:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end('Post for single ' + req.params.dishId + ' not allowed');
});

app.put('/dishes:dishId', (req, res, next) => {
    res.write('Dish ' + req.params.dishId + ' updated');
    res.end('Will update the dish: ' + req.body.name + ' with details ' + req.body.description);

});

app.delete('/dishes:dishid', (req, res, next) => {
    res.end('Deleting dish ' + req.params.dishId);
});
*/

const server = http.createServer(app);
server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`)
});


