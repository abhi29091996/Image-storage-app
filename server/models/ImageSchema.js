const {  mongoose } = require("mongoose");

const imageSchema = new mongoose.Schema({
    fileName: String,
    filepath: String,
  });
  
  const Image = mongoose.model('Image', imageSchema);
  module.exports={Image}