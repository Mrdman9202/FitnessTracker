const express = require('express');
const path = require('path');
const router = require('./routes/siteRoutes');
// const mustache = require('mustache-express');
// const bodyParser = require('body-parser');

const app = express();
const public = path.join(__dirname, 'public');

// app.engine('mustache', mustache());
// app.set('view engine', 'mustache');
// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(public));
app.use('/', router);



   
app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
}) 
   
//import the nedb module
const nedb = require('nedb');

//create a db
const db = new nedb({ filename: 'goals.db', autoload: true});

const dbUsers = new nedb({ filename: 'users.db', autoload: true});

console.log('db created.');


