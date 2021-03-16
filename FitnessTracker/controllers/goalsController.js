const goalsDAO = require('../models/goalModel');
const db = new goalsDAO();

exports.landing_page = function(reg, res) {
    res.send('Hello! Welcome to my application.');
    db.init();
};

exports.register = function(reg, res) {
    res.send('</h1>register not implemented</h1>');
};

exports.login = function(reg, res) {
    res.send('<h1>login not implemented</h1>');
};

exports.user_goals = function(reg, res) {
    res.send('<h1>user goals not implemented</h1>');
    db.getUsersGoals();
};

exports.add_goal = function(req, res) {
    res.send('<h1>Not yet implemented: show add goal page.</h1>');
};

exports.edit_goal = function(reg, res) {
    res.send('<h1>edit goals not implemented</h1>');
};

exports.complete_goal = function(reg, res) {
    res.send('<h1>compelete goals not impelemented</h1>');
};





