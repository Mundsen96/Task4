
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoConnect = require('./util/database').mongoConnect;
const adminController = require('./controllers/admin');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const isAuth = require('./middleware/is-Auth');
const MONG_URI = process.env.MONG_URI;


const app = express();
const store = new MongoDBStore({
  uri: MONG_URI,
  collection: 'sessions'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'my secret', resave: false, saveUninitialized: false, store: store}));

require('dotenv').config();
port = parseInt(process.env.PORT);

app.listen(port,_=>console.log(`The server is listening on port ${port}`) );

app.get('/users',isAuth , adminController.getUsers);

app.post('/register', adminController.postAddUser);

app.post('/login', adminController.logIn);
app.post('/users', adminController.updateUsers);
// app.get('/auth', isAuth);

mongoConnect(() => {
  app.listen(process.env.PORT || 5000);
});


