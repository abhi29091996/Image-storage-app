const AWS = require("aws-sdk");

const s3 = new AWS.S3();
console.log(process.env.ACCESS_KEY, process.env.SECRET_KEY)

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: "us-east-1", // Replace with your desired AWS region
});

module.exports={s3}