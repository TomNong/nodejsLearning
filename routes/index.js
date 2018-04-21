var express = require('express');
var router = express.Router();
var Product = require('../models/product');
/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find();
  Product.find(function(err, docs){
    var productChunks = [];
    var chunkSize = 3;
    //console.log(docs);
    for(var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    //console.log(docs.slice(0, 0 + chunkSize));
    res.render('shop/index', { title: 'Shopping cart', products: productChunks});
  });
});

module.exports = router;
