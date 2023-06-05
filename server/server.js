const express=require('express')
const connectDB = require('./config/database');
const session = require('express-session');
const passport = require('./controller/authController');
const cors=require('cors')
var bodyParser = require('body-parser')

require('dotenv').config()

const app=express();
connectDB()

app.use(cors())
app.options("*",cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Set up session middleware
app.use(
    session({
      secret: 'abhishek_session_secret', // Replace with your desired session secret
      resave: false,
      saveUninitialized: false,
    })
  );
  
  // Initialize Passport.js
  app.use(passport.initialize());
  app.use(passport.session());
  

const PORT = process.env.PORT || 3000;

// Import routes
const apiRoutes = require('./routes/routes');

// // Middleware
// app.use(express.json());

// API routes
app.use('/api', apiRoutes);


app.listen(PORT,(req,res)=>{
    console.log('server started succesfully')
})