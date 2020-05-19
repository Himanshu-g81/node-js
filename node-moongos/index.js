const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to database');

    var newDish = Dishes({
        name: 'Pizza1',
        description: 'pizza with tomato'
    });

    newDish.save()
    .then((dish)=> {
        console.log(dish);
        return Dishes.find({}).exec();
    })
    .then(() => {
        
        return mongoose.connection.db.dropCollection('dishes');
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => {
        console.log(err);
    });

}).catch((err) => {
    console.log(err);
});