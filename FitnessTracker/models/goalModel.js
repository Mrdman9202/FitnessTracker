//import the nedb module
const nedb = require('nedb');

class Goals{

  //constructir that creates the embedded DB
  constructor() {

      this.db = new nedb({ filename: 'goals.db', autoload: true });
      console.log('goals db created in embedded mode');
  
  }; 

  //the user: 'test' doesnt actually add the goals to the created user 'tests'
  // // Seed the database
  // init () {

  //     this.db.insert({
  //         user: 'test',
  //         goal: 'Do Weights',
  //         exReps:2,
  //         exTime: 4,
  //         reps: 10,
  //         time: 10,
  //         isComplete: false,
  //         goalDate: new Date(2021, 3, 18)
  //     });

  //     console.log('goal : Do Boxing added')

  //     this.db.insert({
  //         user: 'test',
  //         goal: 'run',
  //         exReps:2,
  //         exTime: 4,
  //         reps: 1,
  //         time: 20,
  //         isComplete: false,
  //         goalDate: new Date(2021, 3, 19)
  //     }); 

  //     console.log('goal : boxing Added')

  //     this.db.insert({
  //             user: 'test',
  //             goal: 'Do Push Ups',
  //             exReps:2,
  //             exTime: 4,
  //             reps: 10,
  //             time: 10,
  //             isComplete: true,
  //             goalDate: new Date(2021, 3, 14)
  //     });

  //     console.log('goal : Do Push Ups added')

  //     this.db.insert({
  //         user: 'test',
  //         goal: 'run',
  //         exReps:2,
  //         exTime: 4,
  //         reps: 1,
  //         time: 20,
  //         isComplete: true,
  //         goalDate: new Date(2021, 3, 15)
  //     }); 

  //     console.log('goal : run Added')
  //}; //end of seeding

  //gets the users goals from the DB using the passed through user  
  getUsersGoals(user){
      
      //return a Promise object, which can be resolved or rejected
      return new Promise((resolve, reject) => {

          //use the find() function of the database to get the data,
          //error first callback function, err for error, entries for data
          this.db.find({ user: user}, function(err, goals) {
              //if error occurs reject Promise
                if (err) {
                  reject(err);
                  //if no error resolve the promise & return the data
              } else {
                  resolve(goals);
                  //to see what the returned data looks like
                  // console.log('function all() returns: ', entries);
                  console.log('promise in getAllEntries resovled');
              }
          })
      }) 
  }


  //add goal to DB Function using the passed through goal and date
  addGoal (user, goal, goalDate, exReps, exTime) {
      var newGoal = {
        user: user,
        goal: goal,
        exReps: exReps,
        exTime: exTime,
        rep: 'N/A',
        time: 'N/A',
        isComplete: false,
        goalDate: goalDate
      };

      this.db.insert(newGoal, function(err, doc) {
          if (err) {
              console.log('Error inserting document', goal);
          } else {
              console.log('document inserted into the database', doc);
          }
      })
    };

    //updated the passed through goal in the DB
    updateGoal (id, goal, goalDate, exReps, exTime) {
      this.db.update({ _id: id }, { $set: { goal: goal, goalDate: goalDate, exReps: exReps, exTime: exTime} }, (err, numUpdated) => {
        err ? console.log(`Error updating goal: ${id}`) : console.log(`${numUpdated} Goal updated in db`)
      })
    }

  //delete passed through goals function from DB  
  deleteGoal (id) {
      this.db.remove({ _id: id }, { multi: false }, (err, numOfDocsRemoved) => {
        err ? console.log(`Error deleting goal: ${id}`) : console.log(`${numOfDocsRemoved} Goal removed from db`)
      });
  };
      
  //get the goal that matches the passed through goal id
  getGoalById (id) {
      return new Promise((resolve, reject) => {
        this.db.findOne({ _id: id }, (err, entry) => {
          err ? reject(err) : resolve(entry)
        })
      })
    }
  
  //completes the passed through goal  
  compelteGoal (id, reps, time) {
    this.db.update({ _id: id }, { $set: { reps: reps, time: time, isComplete: true } }, (err, numUpdated) => {
      err ? console.log(`Error updating goal: ${id}`) : console.log(`${numUpdated} Goal updated in db`)
    })
  }

}//end of goals class

//make the module visible outside
module.exports = Goals;


