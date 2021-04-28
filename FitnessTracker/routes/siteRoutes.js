const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/goalsController');

const auth = require('../auth/auth.js');
const {ensureLoggedIn} = require('connect-ensure-login'); 

router.get('/', controller.landing_page);

router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user); 

router.get('/login', controller.show_login_page);
router.post("/login", auth.authorize("/login"), controller.post_login); 

router.get("/logout", controller.logout); 

router.get('/mygoals', ensureLoggedIn('/login'), controller.user_goals);

router.get('/addgoal', ensureLoggedIn('/login'), controller.add_goal);
router.post('/addgoal', ensureLoggedIn('/login'), controller.post_add_goal);

router.get('/editgoal/:_id', ensureLoggedIn('/login'), controller.edit_goal);
router.post('/editgoal/:_id', ensureLoggedIn('/login'), controller.post_edit_goal);

router.get('/completegoal/:_id', ensureLoggedIn('/login'), controller.complete_goal);
router.post('/completegoal/:_id', ensureLoggedIn('/login'), controller.post_complete_goal);

router.get('/deletegoal/:_id', ensureLoggedIn('/login'), controller.delete_goal);

module.exports = router;