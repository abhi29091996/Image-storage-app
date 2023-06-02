const mongoose =require('mongoose');
require('dotenv').config()

const connectDB=()=>{
    const mongoDBUrl=process.env.MONGODB_URL

//create mongoDB connection
mongoose.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
};

module.exports = connectDB;