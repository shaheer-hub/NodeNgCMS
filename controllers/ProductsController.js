var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Product = require("../models/Product");
router.post("/add", function(req, res) {
  Product.create(
    {
        prod_name: req.body.prod_name,
        prod_price: req.body.prod_price,
        prod_description: req.body.prod_description,
        prod_category: req.body.prod_category,
        prod_type: req.body.prod_type
    },
    function(err, product) {
      if (err){
        return res
        .status(500)
        .send("There was a problem adding the information to the database.");

      }
             res.status(200).send(product);
    }
  );
});
// RETURNS ALL THE Products IN THE DATABASE
router.get("/get", function(req, res) {
  Product.find({}).populate('prod_category').populate('prod_type').exec(
     function(err, products) {
      if (err)
        return res.status(500).send("There was a problem finding the Products.");
      res.status(200).send(products);
    }
  );
//populate query of categories
// router.get("/get", function(req, res) {
//   Product.find({}, function(err, products) {
//     if (err)
//       return res.status(500).send("There was a problem finding the Products.");
//     res.status(200).send(products);
//   }).populate('prod_category');
 
});
module.exports = router;
