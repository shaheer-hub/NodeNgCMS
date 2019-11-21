var mongoose = require('mongoose');  
var CategorySchema = new mongoose.Schema({  
    cat_name: String
    
});
mongoose.model('Category', CategorySchema);
module.exports = mongoose.model('Category');