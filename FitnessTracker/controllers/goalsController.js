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

exports.add_goal = function(req, res) {
    // res.send('<h1>Not yet implemented: show add goal page.</h1>');

    res.render('addGoal', {
        'title': 'Add Goal'
    });
};

exports.edit_goal = function(reg, res) {
    // res.send('<h1>edit goals not implemented</h1>');

    res.render('editGoal', {
        'title': 'Edit Goal'
    });
};

exports.complete_goal = function(reg, res) {
    // res.send('<h1>compelete goals not impelemented</h1>');

    res.render('completeGoal', {
        'title': 'Complete Goal'
    });

//do i need a delete goal?
};





