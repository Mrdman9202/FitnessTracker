const goalsDAO = require('../models/goalModel');
const db = new goalsDAO();

exports.landing_page = function(reg, res) {

    //runs the DB init function which seeds the DB
    // db.init();

     res.render('index', {
        'title': 'Home Page'
    });
};

//register function which has not been implemented yet
exports.register = function(reg, res) {

   res.render('register', {
        'title': 'Register Page'
    });
};

//login function which has not been implemented yet
exports.login = function(reg, res) {
    
    res.render('login', {
        'title': 'Login'
    });
};

//loads the selected users goals from the DB, will be improved when the login and register is implemented 
exports.user_goals = function(reg, res) {

    db.getUsersGoals('daniel').then((list) => {
        res.render('userGoals', {
            'title': 'My Goals',
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
        'title': 'Add Goal'
    });
};


//POST
//passes the parameters to the add goal method
exports.post_add_goal = function(req, res) {
    if (!req.body.goal) {
        res.status(400).send("goals must have an goal name.");
        return;
    };
    db.addGoal(req.body.goal, req.body.goalDate);
    res.redirect('/mygoals');
};

//GET
//gets the selected goals details and passes them to the view
exports.edit_goal = async (req, res) => {
    const id = req.params._id
    const goals = await db.getGoalById(id)
    res.render('editGoal', {
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





