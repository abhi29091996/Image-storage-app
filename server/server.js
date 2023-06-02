const express=require('express')
const connectDB = require('./config/database');
require('dotenv').config()

const app=express();
connectDB()

const PORT = process.env.PORT || 3000;

// Import routes
const apiRoutes = require('./routes/routes');

// Middleware
app.use(express.json());

// API routes
app.use('/api', apiRoutes);


app.listen(PORT,(req,res)=>{
    console.log('server started succesfully')
})