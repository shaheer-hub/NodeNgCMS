var mongoose = require('mongoose');  
var ProductTypeSchema = new mongoose.Schema({  
    prodtype_name: String
    
});
mongoose.model('ProductType', ProductTypeSchema);
module.exports = mongoose.model('ProductType');