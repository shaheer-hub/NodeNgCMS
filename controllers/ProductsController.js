var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multer = require('multer');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Product = require("../models/Product");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      var filename = `${req.body.title}-${new Date().getTime()}${ext}`;
      callback(null, filename);
  }
});
// router.route('/add').post(function (req, res) {
//   let product = new Product(req.body);
//   product.save()
//     .then(product => {
//       res.status(200).json({'product': 'product is added successfully'});
//     })
//     .catch(err => {
//     res.status(400).send("unable to save to database");
//     });
// });
router.post("/add", function(req, res, err) {
  var upload = multer({ storage: storage }).fields([{ name: 'prod_photo', maxCount: 1 }]);
  if (err) {
    res.status(500).json({ message: "Failed to upload file", error: err });
}

//If upload success save movie details
upload(req, res, function (err) {
var product = new Product(req.body);
if (req.files.prod_photo && req.files.prod_photo.length > 0) {
    product.prod_photo = `http://${req.get('host')}/uploads/${req.files.prod_photo[0].filename}`;
}

});
  Product.create(
    {
      prod_name: req.body.prod_name,
      prod_price: req.body.prod_price,
      prod_description: req.body.prod_description,
      prod_category: req.body.prod_category,
      prod_type: req.body.prod_type,
      prod_photo: product.prod_photo
    },
    function(err, product) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(product);
    }
  );
});

// router.post('/add', function(req, res, next) {
//   Product.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });
// router.post("/add",function (req, res) {
  
//     const product = new Product({
//     _id: new mongoose.Types.ObjectId(),
//     prod_name: req.body.prod_name,
//     prod_description: req.body.prod_description,
//     prod_price:req.body.prod_price,
//     prod_category:req.body.prod_category,
//     prod_type:req.body.prod_type

// });
//   product.save()
//     .then(product => {
//       res.status(200).json({'product': 'product is added successfully'});
//     })
//     .catch(err => {
//     res.status(400).send("unable to save to database");
//     });
// });
// router.post("/add", function(req, res) {
	
  // Product.create(
    // {
        // prod_name: req.body.prod_name,
        // prod_price: req.body.prod_price,
        // prod_description: req.body.prod_description,
        // prod_category: req.body.prod_category,
        // prod_type: req.body.prod_type
    // },
    // function(err, product) {
      // if (err){
        // return res
        // .status(500)
        // .send("There was a problem adding the information to the database.");

      // }
             // res.status(200).send(product);
    // }
  // );
// });
// RETURNS ALL THE Products IN THE DATABASE
// router.get("/get", function(req, res) {
//   Product.find({}).populate('prod_category').populate('prod_type').exec(
//      function(err, products) {
//       if (err)
//         return res.status(500).send("There was a problem finding the Products.");
//       res.status(200).send(products);
//     }
//   );
  router.get("/get", function(req, res) {
    Product.find({}, function(err, products) {
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
