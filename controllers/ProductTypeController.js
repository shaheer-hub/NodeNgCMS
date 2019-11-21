var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var ProductType = require("../models/ProductType");
router.post("/add", function(req, res) {
    ProductType .create(
    {
        prodtype_name: req.body.prodtype_name
    },
    function(err,  producttype) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send( producttype);
    }
  );
});
// RETURNS ALL THE Products IN THE DATABASE
router.get("/get", function(req, res) {
    ProductType .find({}, function(err, producttypes) {
    if (err)
      return res.status(500).send("There was a problem finding the Products.");
    res.status(200).send( producttypes);
  });
});
module.exports = router;
