const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/goalsController');

router.get('/', controller.landing_page);
router.get('/register', controller.register);
router.get('/login', controller.login);
router.get('/mygoals', controller.user_goals);
router.get('/addgoal', controller.add_goal);
router.get('/editgoal', controller.edit_goal);
router.get('/completegoal', controller.complete_goal);

router.use(function(req, res) {
    res.status(404);
    res.send('Oops! We didn\'t find what you are looking for.');
});

router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
});
   

module.exports = router;