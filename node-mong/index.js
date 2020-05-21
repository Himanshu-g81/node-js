const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboperations = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {
    
    console.log("Connected server");
    const db = client.db(dbname);
    dboperations.insertDocument(db, {"name": "pizza", "description": 'pizza description1'}, 'dishes').then((res) => {
        console.log("inserted doc ", res.ops);  // ops : number of inserted docs
        return dboperations.insertDocument(db, {"name": "burger", "description": "burger desc"}, 'dishes');
        }).then((res) => {
            console.log("inserted doc ", res.ops);  // ops : number of inserted docs    
            return dboperations.findDocuments(db, 'dishes');
        }).then((docs) => {
            console.log('got docs: ', docs);
            return dboperations.updateDocument(db, {"name": "pizza"}, {"name": "pizza1", "description": "pizza description"}, 'dishes');
        }).then((res) => {
            console.log("updated doc\n", res.result);
            return dboperations.findDocuments(db, 'dishes');
        }).then((docs) => {
            console.log('got docs: ', docs);
            return db.dropCollection('dishes');
        }).then ((res) => {
            console.log('Dropped collection: ', res);
        }).catch((err) => {console.log(err)});
}).catch((err) => {
    console.log(err);
});