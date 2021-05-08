const goalsDAO = require('../models/goalModel');
const userDao = require('../models/userModel.js'); 
const db = new goalsDAO();
const auth = require('../auth/auth.js');
const {ensureLoggedIn} = require('connect-ensure-login'); 
const Goals = require('../models/goalModel');
const Moment = require('moment')

exports.landing_page = function(req, res) {

    //runs the DB init function which seeds the DB
    // db.init();
    const currentWeek = Moment().isoWeek()
     res.render('index', {
        'title': 'Home Page',
        'user': req.user,
        'currentWeek': currentWeek
    });
};

//register function which has not been implemented yet
exports.show_register_page = function(req, res) {
   const currentWeek = Moment().isoWeek()
   res.render('register', {
        'title': 'Register Page',
        'currentWeek': currentWeek
    });
};

exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const name = req.body.name;
    const password = req.body.pass;
    //console.log("register user", user, "password", password);
    if (!user || !name || !password) {
        res.send(401, 'no user, no name or no password');
        return;
    }
    userDao.lookup(user, function(err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
    userDao.create(user, name, password);
    res.redirect('/login');
    });
};

//login function which has not been implemented yet
exports.show_login_page = function(req, res) {
    const currentWeek = Moment().isoWeek()
    res.render('login', {
        'title': 'Login',
        'currentWeek': currentWeek
    });
};

exports.post_login = function(req, res) {
    const currentWeek = Moment().isoWeek()
    res.redirect(`/mygoals/${currentWeek}`);
    // res.redirect("/mygoals/${currentWeek}");
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
}; 

//loads the signed in users goals from the DB

exports.user_goals_by_week = async (req, res) => {

    const today = new Moment()
    const currentWeek = req.params.currentWeek
    const previousWeek = Number(currentWeek) - 1
    const nextWeek = Number(currentWeek) + 1
    today.isoWeek(currentWeek)
    await db.getUserGoalsByWeekNumber(req.user, currentWeek).then(listOfAllGoals => {
      res.render('userGoals', {
        'user': req.user,
        'upcomingGoals': listOfAllGoals.filter(goal => goal.isComplete === false),
        'completedGoals': listOfAllGoals.filter(goal => goal.isComplete === true),
        'currentWeek': Number(currentWeek),
        // 'currentWeek2': currentWeek2,
        'previousWeek': previousWeek,
        'nextWeek': nextWeek,
        'fromDate': today.startOf('isoWeek').format('ddd D MMM').toString(),
        'toDate': today.endOf('isoWeek').format('ddd D MMM').toString(),
        'thisWeek': Moment().isoWeek()
      })
      console.log('Promise resolved')
    }).catch(err => {
      console.log(`Promise rejected: ${err}`)
    })
  }

  //public goals
  exports.public_goals_by_week = async (req, res) => {

    const today = new Moment()
    const currentWeek = req.params.currentWeek
    const previousWeek = Number(currentWeek) - 1
    const nextWeek = Number(currentWeek) + 1
    today.isoWeek(currentWeek)
    await db.getGoalsByWeekNumber(currentWeek).then(listOfAllGoals => {
      res.render('userGoals', {
        'user': req.user,
        'upcomingGoals': listOfAllGoals.filter(goal => goal.isComplete === false),
        'completedGoals': listOfAllGoals.filter(goal => goal.isComplete === true),
        'currentWeek': Number(currentWeek),
        // 'currentWeek2': currentWeek2,
        'previousWeek': previousWeek,
        'nextWeek': nextWeek,
        'fromDate': today.startOf('isoWeek').format('ddd D MMM').toString(),
        'toDate': today.endOf('isoWeek').format('ddd D MMM').toString(),
        'thisWeek': Moment().isoWeek()
      })
      console.log('Promise resolved')
    }).catch(err => {
      console.log(`Promise rejected: ${err}`)
    })
  }


//GET
//sends the title to the view
exports.add_goal = function(req, res) {
    const currentWeek = Moment().isoWeek()
    res.render('addGoal', {
        'title': 'Add Goal',
        'user': req.user,
        'currentWeek': currentWeek
    });
};

//POST
//passes the parameters to the add goal method
exports.post_add_goal = function(req, res) {
    if (!req.body.goal) {
        res.status(400).send("goals must have an goal name.");
        return;
    };
    db.addGoal(req.user, req.body.goal, req.body.exReps, req.body.exTime, req.params.currentWeek);
    res.redirect(`/mygoals/${req.params.currentWeek}`)
};

//GET
//gets the selected goals details and passes them to the view
exports.edit_goal = async (req, res) => {
    const currentWeek = Moment().isoWeek()
    const id = req.params._id
    const goals = await db.getGoalById(id)
    res.render('editGoal', {
      'title': 'Edit Goal',
      'user': req.user,
      'goal': goals.goal,
      'goalDate' : goals.goalDate,
      'exReps': goals.exReps,
      'exTime': goals.exTime,
      'currentWeek': currentWeek
    });;
  }

//POST
//passes the parameters to the update goal method
exports.post_edit_goal = function(req, res) {

    if (!req.body.goal) {
        res.status(400).send('Goal must contain goal name')
        return
      }
  
      db.updateGoal(req.params._id, req.body.goal, req.body.exReps, req.body.exTime)
      res.redirect(`/mygoals/${req.params.currentWeek}`)
};

//GET
//gets the sellected goals details and passes them to the view
exports.complete_goal = async (req, res) => {
    const currentWeek = Moment().isoWeek()
    const id = req.params._id
    const goals = await db.getGoalById(id)
    res.render('completeGoal', {
      'title': 'Complete Goal',
      'user': req.user,
      'goal': goals.goal,
      'goalDate' : goals.goalDate,
      'exReps': goals.exReps,
      'exTime': goals.exTime,
      'reps': goals.reps,
      'time': goals.time,
      'currentWeek': currentWeek
    })

  }

//POST
//passes the parameters to the complete goal method
exports.post_complete_goal = function(req, res) {
 
      db.compelteGoal(req.params._id, req.body.reps, req.body.time);
      res.redirect(`/mygoals/${req.params.currentWeek}`)
};

//calls the delete goal method and passes through an ID
exports.delete_goal = async (req, res) => {
    if (!req.params._id) {
      res.status(400).send('No goal id provided');
      return
    };
  
    await db.deleteGoal(req.params._id);
    res.redirect(`/mygoals/${req.params.currentWeek}`)
};





