var q = require("q");
var db = require("../common/database");

function addUser(user) {
    if (user) {
        // var defer = q.defer();
        // let kq = false;
        db.query(`INSERT INTO users(email,password,first_name,last_name) VALUES ('${user.email}','${user.password}','${user.first_name}','${user.last_name}')`, function(err, result) {
            if (result)
                return result

        });


    }
}

module.exports = { addUser, db }