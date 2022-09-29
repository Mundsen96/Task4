const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://Sebastian:sebamlot@task4cluster.7hfe3rj.mongodb.net/users?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No Database found!'
};

// const getNextIdValue = (sequenceName) => {
//   var sequenceDocument = _db.counters.findAndModify({
//      query:{_id: sequenceName },
//      update: {$inc:{sequence_value:1}},
//      new:true
//   });
//   return sequenceDocument.sequence_value;
// }

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// exports.getNextIdValue = getNextIdValue;