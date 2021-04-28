const goalsDAO = require('../models/goalModel');
const userDao = require('../models/userModel.js'); 
const db = new goalsDAO();
const auth = require('../auth/auth.js');
const {ensureLoggedIn} = require('connect-ensure-login'); 

exports.landing_page = function(req, res) {

    //runs the DB init function which seeds the DB
    // db.init();
     res.render('index', {
        'title': 'Home Page',
        'user': req.user
    });
};

//register function which has not been implemented yet
exports.show_register_page = function(req, res) {

   res.render('register', {
        'title': 'Register Page'
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
    
    res.render('login', {
        'title': 'Login'
    });
};

exports.post_login = function(req, res) {
    res.redirect("/mygoals");
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect("/");
}; 

//loads the selected users goals from the DB, will be improved when the login and register is implemented 
exports.user_goals = function(req, res) {

    db.getUsersGoals(req.user).then((list) => {
        res.render('userGoals', {
            'title': 'My Goals',
            'user': req.user,
            'upcomingGoals': list.filter(goal => goal.isComplete == false),
            'completedGoals': list.filter(goal => goal.isComplete == true)
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
};

//GET
//sends the title to the view
exports.add_goal = function(req, res) {

    res.render('addGoal', {
        'title': 'Add Goal',
        'user': req.user,
    });
};

//POST
//passes the parameters to the add goal method
exports.post_add_goal = function(req, res) {
    if (!req.body.goal) {
        res.status(400).send("goals must have an goal name.");
        return;
    };
    db.addGoal(req.user, req.body.goal, req.body.goalDate);
    res.redirect('/mygoals');
};

//GET
//gets the selected goals details and passes them to the view
exports.edit_goal = async (req, res) => {
    const id = req.params._id
    const goals = await db.getGoalById(id)
    res.render('editGoal', {
      'user': req.user,
      'goal': goals.goal,
      'goalDate' : goals.goalDate
    });;
  }

//POST
//passes the parameters to the update goal method
exports.post_edit_goal = function(req, res) {

    if (!req.body.goal) {
        res.status(400).send('Goal must contain goal name')
        return
      }
  
      db.updateGoal(req.params._id, req.body.goal, req.body.goalDate)
      res.redirect(`/mygoals`)
};

//GET
//gets the sellected goals details and passes them to the view
exports.complete_goal = async (req, res) => {
    const id = req.params._id
    const goals = await db.getGoalById(id)
    res.render('completeGoal', {
      'user': req.user,
      'goal': goals.goal,
      'goalDate' : goals.goalDate,
      'reps': goals.reps,
      'time': goals.time
    })

  }

//POST
//passes the parameters to the complete goal method
exports.post_complete_goal = function(req, res) {
 
      db.compelteGoal(req.params._id, req.body.reps, req.body.time);
      res.redirect(`/mygoals`);
};

//calls the delete goal method and passes through an ID
exports.delete_goal = async (req, res) => {
    if (!req.params._id) {
      res.status(400).send('No goal id provided');
      return
    };
  
    await db.deleteGoal(req.params._id);
    res.redirect(`/mygoals`);
};





