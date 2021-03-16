const express = require('express');
const path = require('path');
const router = require('./routes/siteRoutes');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
const public = path.join(__dirname, 'public');

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(public));
app.use('/', router);


app.use(function(req, res) {
    res.status(404);
    res.send('Oops! We didn\'t find what you are looking for.');
});

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});


app.listen(3000, () => {
    console.log('Server started on port 3000. Ctrl^c to quit.');
});




