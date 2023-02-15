const express = require('express'); // requiring express library to serve static files, http requets etc...
const mongoose = require('mongoose'); // requiring mongoose an ORM to faciltate the CRUD operation in our db
const compression = require('compression'); // requirng the compression respone function
const helmet = require('helmet'); //requring helmet for common vulnerability
const connect = require('./connect'); // requiring connect function to connect to the database
const home_router = require('./routes/home-route'); // requring home router to handle the routes from home
const form_router = require('./routes/form-route'); // requring form routter that handles the add item add category forms
const app = express(); // creating our express application
// the connection string to connect to the database
const connectionString = process.env.MONGODB_URI;
mongoose.set('strictQuery', true);

// serving our static files in the public directory
app.use(express.static(__dirname + '/public'));
// using helmet for common vulnerability
app.use(helmet());
//using the compression function
app.use(compression());
// setting the view engine to ejs
app.set('view engine', 'ejs');
// encoding the url so we can access the body
app.use(express.urlencoded({ extended: true }));
// using our routers in the app
app.use('/', home_router);
app.use('/forms', form_router);

// server running and listnining on port 8080
app.listen(8080, () => {
  console.log('server listnining on port 8080...');
});

// connecting to the database
connect(connectionString);
