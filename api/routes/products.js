const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'Handling the GET requests to /products'
  });
});

router.post('/',(req, res, next) => {
//  const product = {
//    name: req.body.name,
//    price: req.body.price
//  };
  const product = new Product({//passing the js object to the model Product to create it
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then( result => {
      console.log(result);
      res.status(201).json({
        message: 'NEW PRODUCT POSTED',
        createdProduct: result
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      });
    });

  });
});

router.get('/:productId', (req, res, next) =>{
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log(doc);
    res.status(200).json(doc);
  })
  .cacth(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

router.patch('/:productId', (req, res, next) =>{
  res.status(200).json({
    message:'updated product'
  });
});

router.delete('/:productId', (req, res, next) =>{
  res.status(200).json({
    message:'deleted product'
  });
});

module.exports = router;
