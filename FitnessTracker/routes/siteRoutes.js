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

router.get(`/mygoals/:currentWeek`, ensureLoggedIn('/login'), controller.user_goals_by_week)

router.get('/mygoals/:previousWeek', ensureLoggedIn('/login'), controller.user_goals_by_week)

router.get(`/publicWeeklyGoals/:currentWeek`, ensureLoggedIn('/login'), controller.public_goals_by_week)

router.get('/mygoals/:previousWeek', ensureLoggedIn('/login'), controller.user_goals_by_week)

router.get('/mygoals/:nextWeek', ensureLoggedIn('/login'), controller.user_goals_by_week)

router.get('/addgoal/:currentWeek', ensureLoggedIn('/login'), controller.add_goal)
router.post('/addgoal/:currentWeek', ensureLoggedIn('/login'), controller.post_add_goal)

router.get('/editgoal/:_id/:currentWeek', ensureLoggedIn('/login'), controller.edit_goal)
router.post('/editgoal/:_id/:currentWeek', ensureLoggedIn('/login'), controller.post_edit_goal)

router.get('/completegoal/:_id/:currentWeek', ensureLoggedIn('/login'), controller.complete_goal);
router.post('/completegoal/:_id/:currentWeek', ensureLoggedIn('/login'), controller.post_complete_goal);

router.get('/deletegoal/:_id/:currentWeek', ensureLoggedIn('/login'), controller.delete_goal);

router.get('/makePublic/:_id/:currentWeek', ensureLoggedIn('/login'), controller.make_public);


router.get('/makeUnpublic/:_id/:currentWeek', ensureLoggedIn('/login'), controller.make_unpublic);

module.exports = router;