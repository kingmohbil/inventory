const express = require('express');
const mongoose = require('mongoose');
const connect = require('./connect');
const form_router = require('./routes/form-route');
const home_router = require('./routes/home-route');
const app = express();

const connectionString = `mongodb+srv://kingmohbil:Mo7ammad2003%40@myatlasclusteredu.fqptvlx.mongodb.net/groceries_inventory?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', home_router);
app.use('/forms', form_router);

console.log('waiting the server to connect...');
// server running and listnining on port 8080
app.listen(8080, () => {
  console.log('connected listnining on port 8080...');
});

// connecting to the database
connect(connectionString);
