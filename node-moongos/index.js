const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to database');

    var newDish = Dishes({
        name: 'Pizza1.1',
        description: 'pizza with tomato'
    });

    newDish.save()
    .then((dish)=> {
        console.log('dish', dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: 'Updated test'}
            
        }, {
            new: true
        }).exec();
    })
    .then((dish) => {
        console.log('dish after update: ', dish);
        dish.comments.push({
            rating: 5,
            comment: `I ' m getting a sinking feeling!`,
            author: 'Someone'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log('dish ', dish);
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