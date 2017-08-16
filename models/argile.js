let mongoose = require('mongoose');

//argile schema
let argileSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  product:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  }
});


let argile = module.exports = mongoose.model('argile', argileSchema);
