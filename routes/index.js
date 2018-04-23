var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
// all url traffic go through the router should be protected by the csrfToken
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
router.get('/user/signup', function(req, res, next){
  res.render('user/signup', {csrfToken: req.csrfToken()})
});
router.post('/user/signup', function(req, res, next){
  res.redirect('/');
});
module.exports = router;
