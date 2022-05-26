var express = require("express");

var router = express.Router();
var user_md = require("../models/user");
var helper = require("../heplers/helper");
const { db } = require("../models/user");


router.get("/", function(req, res) {

    res.json({ "message": "this admin" });
});

router.get("/signup", function(req, res) {
    res.render("signup");
});

router.post("/signup", async function(req, res) {
    let user = req.body;
    console.log(user);
    if (user.email.trim().length === 0 || !user.passwd || !user.repasswd) {
        return res.render("signup", { data: "Email required" });
    }
    if (user.passwd != user.repasswd || !user.passwd) {
        return res.render("signup", { data: "passwd must Match" });

    }
    db.query(`SELECT * FROM users WHERE email='${user.email}'`, async function(err, result) {
        if (result) return res.render("signup", { data: "User exist" });
        const password = await helper.hash_password(user.passwd);

        let newUser = {
            email: user.email,
            password,
            first_name: user.firstname,
            last_name: user.lastname
        };


        await user_md.addUser(newUser);
        return res.render("signup", { success: "Registration success" });
    })




});






router.get("/signin", function(req, res) {

    res.render("signin", { data: {} });
});
router.post("/signin", function(req, res) {
    res.render("signin", { data: {} });
});
router.post("/signin", function(req, res) {
    var params = req.body;

    if (params.email.trim().length == 0) {

        res.render("signin", { data: { error: "please enter an email" } });
    }
});

module.exports = router;