const User = require('../models/user');
const getDb = require('../util/database').getDb;

exports.postAddUser = (req, res, next) => {
  const username = req.body.dataToSend.name;
  const email = req.body.dataToSend.email;
  const password = req.body.dataToSend.password;
  const user = new User(username, email, password);
  user
    .findOne()
    .then((userDoc) => {
      if (userDoc) {
        return res.send('false');
      }
      user.save();
      return res.send('true');
    })
    .then((result) => {})
    .catch((err) => {
      console.log(err);
    });
};

exports.getUsers = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  User.fetchAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logIn = (req, res, next) => {
  const db = getDb();
  const username = req.body.dataToSend.name;
  const email = req.body.dataToSend.email;
  const password = req.body.dataToSend.password;
  const lastTimeLogged = new Date().toLocaleString().replace(',', '');
  db.collection('users')
    .find({ name: username, email: email, password: password })
    .toArray()
    .then((result) => {
      if (result.length === 0 || result[0].status === 'blocked') {
        res.send('false');
      } else {
        result[0].lastTimeLogged = lastTimeLogged;
        db.collection('users')
          .replaceOne({ name: username }, result[0])
          .then((results) => {
            req.session.data = {'isLoggedIn': true, 'id': result[0]._id};
            // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
            res.send('true');
          })
          .catch(err => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};


exports.updateUsers = (req, res, next) => {
  if(!req.session.data){
    return res.send('false');
  };
  const users = req.body.postData;
  const db = getDb();
  db.collection('users')
    .deleteMany({})
    .then((res) => {
      db.collection('users').insertMany(users).then(res => {
        let currentUser = req.session.data ? users.filter(user => user._id === req.session.data.id) : [];
        if(currentUser.length === 0){
          req.session.destroy();
        }else if(currentUser[0].status === 'blocked'){
          req.session.destroy();
        }
      })
    })
    .catch((err) => console.log(err));
};