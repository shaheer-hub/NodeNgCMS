var app = require("./app");
var port = process.env.port || 4000;
//var productRoute = require('./controllers/ProductsController')
var categoryRoute = require('./controllers/CategoryController');
var productRoute = require('./controllers/ProductsController');
var productTypeRoute = require('./controllers/ProductTypeController');
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/productType', productTypeRoute);
var server = app.listen(port , function(){
    console.log('Express server running on port' +port);
});