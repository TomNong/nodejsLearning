var Product = require('../models/product');
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/shopping');
var products = [
  new Product({
  imagePath: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
  title: "Mars",
  description: "Not available yet",
  price: 100000
  }),
  new Product({
    imagePath: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
    title: "Mars",
    description: "Not available yet",
    price: 10000
  })
];
var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result){
    done++;
    if(done === products.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.disconnect();
}
