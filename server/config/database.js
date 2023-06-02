const mongoose =require('mongoose');

const connectDB=()=>{
    const mongoDBUrl='mongodb://0.0.0.0:27017/ImageStorage'

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