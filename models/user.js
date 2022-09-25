const getDb = require('../util/database').getDb;

class User {
  constructor(name, email, password, lastTimeLogged) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.registrationTime = new Date().toLocaleString().replace(',', '');
    this.status = 'active';
    this.lastTimeLogged = lastTimeLogged;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('users')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      }); //find does not return array, it returns info about data and then you can specify which you want to save. toArray takes all
  }

  isRegistered(object){
    const db = getDb();
    return db
      .collection('users')
      .find(object)
      .count()
  }

  findOne(){
    const db = getDb();
    return db
      .collection('users')
      .findOne({'email': this.email, 'name': this.name})
  }
}
module.exports = User;
