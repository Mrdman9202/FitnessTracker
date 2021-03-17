//import the nedb module
const nedb = require('nedb');

class Goals{

    constructor() {

        this.db = new nedb({ filename: 'goals.db', autoload: true });
        console.log('goals db created in embedded mode');

        this.dbUsers = new nedb({ filename: 'users.db', autoload: true});
        console.log('users db created in embedded mode');

        
    } 

    // Seed the database
    init () {

        this.dbUsers.insert({
            username: 'dan the man',
            name: 'Daniel',
            passwordHash: 'yo'
        });

        console.log('user : Daniel Added')

        this.db.insert({
            user: 'daniel',
            goal: 'Do Weights',
            reps: '10',
            time: 10,
            isComplete: false,
            goalDate: new Date(2021, 3, 18, 12, 30, 0, 0)
        });

        console.log('goal : Do Boxing added')

        this.db.insert({
            user: 'daniel',
            goal: 'run',
            reps: 'N/A',
            time: 20,
            isComplete: false,
            goalDate: new Date(2021, 3, 19, 12, 30, 0, 0)
        }); 

        console.log('goal : boxing Added')

        this.db.insert({
                user: 'daniel',
                goal: 'Do Push Ups',
                reps: '10',
                time: 10,
                isComplete: true,
                goalDate: new Date(2021, 3, 14, 12, 30, 0, 0)
        });

        console.log('goal : Do Push Ups added')

        this.db.insert({
            user: 'daniel',
            goal: 'run',
            reps: 'N/A',
            time: 20,
            isComplete: true,
            goalDate: new Date(2021, 3, 15, 12, 30, 0, 0)
        }); 

        console.log('goal : run Added')
    }; //end of seeding

    
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


    //add goal to DB Function
    addGoal (goal, goalDate) {
        var newGoal = {
          user: 'daniel',
          goal: goal,
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

        // this.db.insert(newGoal, (err, doc) => {
        //   err ? console.log('Error inserting document: ', goal) : console.log(`Successfully inserted goal to DB: ${goal}`)
        // });
      };

    //delete passed through goals function from DB  
    deleteGoal (id) {
        this.db.remove({ _id: id }, { multi: false }, (err, numOfDocsRemoved) => {
          err ? console.log(`Error deleting goal: ${id}`) : console.log(`${numOfDocsRemoved} Goal removed from db`)
        });
    };
       


}//end of goals class

//make the module visible outside
module.exports = Goals;


