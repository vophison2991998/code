var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {

    res.json({ "message": "this ddhome" });
});
module.exports = router;