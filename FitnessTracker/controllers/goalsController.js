const goalsDAO = require('../models/goalModel');
const db = new goalsDAO();

exports.landing_page = function(reg, res) {

    //runs the DB init function which seeds the DB
    // db.init();

     res.render('index', {
        'title': 'Home Page'
    });
};

exports.register = function(reg, res) {
    // res.send('</h1>register not implemented</h1>');
   res.render('register', {
        'title': 'Register Page'
    });
};

exports.login = function(reg, res) {
    // res.send('<h1>login not implemented</h1>');
    
    res.render('login', {
        'title': 'Login'
    });
};

exports.user_goals = function(reg, res) {
    // res.send('<h1>user goals not implemented</h1>');

    // res.render('userGoals', {
    //     'title': 'My Goals'
    // });

    // db.getUsersGoals('daniel');
    

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
exports.add_goal = function(req, res) {
    // res.send('<h1>Not yet implemented: show add goal page.</h1>');

    res.render('addGoal', {
        'title': 'Add Goal'
    });
};


//POST
exports.post_add_goal = function(req, res) {
    if (!req.body.goal) {
        res.status(400).send("goals must have an goal name.");
        return;
    }
    db.addGoal(req.body.goal, req.body.goalDate);
    res.redirect('/mygoals');
};

// exports.edit_goal = async(req, res) => {

//     // const id = req.params._id
//     // const goal = await db.getGoalById(id)
//     res.render('editGoal', {
//         'title': 'Edit Goal',
//         // 'goal': goal.goal
//     });
// };

exports.edit_goal = async (req, res) => {
    const id = req.params._id
    const goals = await db.getGoalById(id)
    res.render('editGoal', {
      'goal': goals.goal,
      'goalDate' : goals.goalDate
    })

  }

exports.post_edit_goal = function(req, res) {

    if (!req.body.goal) {
        res.status(400).send('Goal must contain goal name')
        return
      }
  
      db.updateGoal(req.params._id, req.body.goal, req.body.goalDate)
      res.redirect(`/mygoals`)
};

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

exports.post_complete_goal = function(reg, res) {
    // res.send('<h1>compelete goals not impelemented</h1>');

    res.render('completeGoal', {
        'title': 'Complete Goal'
    });
};

//do i need a delete goal?
exports.delete_goal = async (req, res) => {
    if (!req.params._id) {
      res.status(400).send('No goal id provided')
      return
    }
  
    await db.deleteGoal(req.params._id)
    res.redirect(`/mygoals`)
}





