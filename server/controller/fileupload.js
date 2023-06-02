const { s3 } = require("../config/awsConfig");
const { Image } = require("../models/ImageSchema");

const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    // Set the parameters for uploading to S3
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload the file to S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.error(err);
        reject("Failed to upload file to S3");
      } else {
        resolve(data.Location);
      }
    });
  });
};

const imageUploadController = async (req, res,err) => {
  const file = req.file;
  const filepath = `${process.env.CLOUDFRONT_URL}/${req.file.originalname}`;
  const fileName = req.file.originalname;

  try {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the file to S3
    const data = await uploadImage(file);
    const newImage = new Image({
        filepath,
        fileName,
      });
    await newImage.save();


    res.send({
      code: 200,
      status: "uploaded",
      message: "Image uploaded successfully",
      data: data,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { imageUploadController };
