const express = require('express');
const router = express.Router(); 
const controller = require('../controllers/goalsController');
const Moment = require('moment')

const auth = require('../auth/auth.js');
const {ensureLoggedIn} = require('connect-ensure-login'); 

router.get('/', controller.landing_page);

router.get('/register', controller.show_register_page);
router.post('/register', controller.post_new_user); 

router.get('/login', controller.show_login_page);
router.post("/login", auth.authorize("/login"), controller.post_login); 

router.get("/logout", controller.logout); 

//implement this
//--------------------------------------------------------------------------------------
router.get(`/mygoals/:currentWeek`, ensureLoggedIn('/login'), controller.user_goals_by_week)

router.get('/mygoals/:previousWeek', ensureLoggedIn('/login'), controller.user_goals_by_week)

router.get('/mygoals/:nextWeek', ensureLoggedIn('/login'), controller.user_goals_by_week)

//to be implemneted
router.get('/addgoal/:currentWeek', ensureLoggedIn('/login'), controller.add_goal)
router.post('/addgoal/:currentWeek', ensureLoggedIn('/login'), controller.post_add_goal)

//old
// router.get('/editgoal/:_id', ensureLoggedIn('/login'), controller.edit_goal);
// router.post('/editgoal/:_id', ensureLoggedIn('/login'), controller.post_edit_goal);

//to be implemneted
router.get('/update/:_id/:currentWeek', ensureLoggedIn('/login'), controller.edit_goal)
router.post('/update/:_id/:currentWeek', ensureLoggedIn('/login'), controller.post_edit_goal)

//old
// router.get('/completegoal/:_id/:currentWeek', ensureLoggedIn('/login'), controller.complete_goal);
// router.post('/completegoal/:_id/:currentWeek', ensureLoggedIn('/login'), controller.post_complete_goal);

//old
// router.get('/deletegoal/:_id'/:currentWeek', ensureLoggedIn('/login'), controller.delete_goal);

//-------------------------------------------------------------------------------------






module.exports = router;