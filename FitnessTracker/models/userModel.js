const Datastore = require("nedb");
// const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserDAO {
    constructor(dbFilePath) {
      this.db = new Datastore({ filename: 'users.db', autoload: true});
      console.log('users db created in embedded mode');  
    }

    // for the demo the password is the bcrypt of the user name
    init() {
        this.db.insert({
            user: 'test',
            name: 'daniel',
            password: '$2b$10$fo7VK2B.BYhkbiFgk0YlOOWg.hZ3dYBF/bdncOXhMgEiaoLNce0Fy'
        });
  
        console.log('user : Daniel Added')

        //console.log('user record inserted in init');
        return this;
    }

    create(username, name, password) {
        const that = this;
        bcrypt.hash(password, saltRounds).then(function(hash) {
            var entry = {
            user: username,
            name: name,
            password: hash
        };
        //console.log('user entry is: ', entry);

        that.db.insert(entry, function (err) {
            if (err) {
                console.log("Can't insert user: ", username);
            }
        });
    });
}

    lookup(user, cb) {
        this.db.find({'user': user}, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                return cb(null, null);
            }
            return cb(null, entries[0]);
        }
    });
}
}

const dao = new UserDAO();
dao.init();
module.exports = dao;