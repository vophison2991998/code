var bcrypt = require("bcrypt");
var config = require("config");

async function hash_password(password) {
    // var saltRounds = config.get("salt");
    // var salt = bcrypt.genSaltSync(saltRounds);
    var hash = await bcrypt.hash(password, 10);

    return hash;
}
module.exports = {
    hash_password: hash_password
}