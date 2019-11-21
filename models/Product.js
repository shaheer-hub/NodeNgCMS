var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ProductSchema = new mongoose.Schema({
  prod_name: String,
  prod_price: Number,
  prod_description: String,
  //   prod_category: {ref:Category},
  prod_category: [{ type: Schema.Types.ObjectId , ref: "Category" }],
  prod_type: [{ type: Schema.Types.ObjectId , ref: "ProductType" }]
  //   prod_producttype:{ref:},
});
mongoose.model("Product", ProductSchema);
module.exports = mongoose.model("Product");
