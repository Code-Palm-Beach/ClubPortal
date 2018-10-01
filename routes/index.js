var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  const data = ["thing1", "thing2", "thing3"];
  res.render("index", { title: "Code Palm Beach" });
});

module.exports = router;
