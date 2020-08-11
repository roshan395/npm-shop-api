const mongoose = require('mongoose');

const productSchema = mongoose.Schema({//passing js object to know how a product shoild look like
  _id: mongoose.Schema.Types.ObjectId, //special type of data to give the automatic serial no.
  name: String,
  price: Number
});

module.exports = mongoose.model('Product', productSchema);//exporting the productschema on name Product
