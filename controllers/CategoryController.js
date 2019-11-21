var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Category = require("../models/Category");
router.post("/add", function(req, res) {
  Category.create(
    {
      cat_name: req.body.cat_name
    },
    function(err, category) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(category);
    }
  );
});
// RETURNS ALL THE Products IN THE DATABASE
router.get("/get", function(req, res) {
  Category.find({}, function(err, categories) {
    if (err)
      return res.status(500).send("There was a problem finding the Category.");
    res.status(200).send(categories);
  });
});
module.exports = router;
