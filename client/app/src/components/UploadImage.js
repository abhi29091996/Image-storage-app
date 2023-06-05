import React, { useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios from 'axios'

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: theme.spacing(2),
//   },
// }));

const UploadImage = () => {
  //   const classes = useStyles();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('>>>?',image)
    // Perform image upload and submit logic here
    // ...
    var formData = new FormData();
var imagefile = document.querySelector('#file');
formData.append("Image", image)
formData.append("category", category)
    const response = await axios
      .post("http://localhost:5000/api/upload",formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
      .then((response) => {
        console.log(response);
        return response
      });

    // Reset form fields
    if(response.data)
    setImage(null);
    setCategory("");
  };

  return (
    <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding:'20px'
          }}
          onSubmit={handleSubmit}
        >
            
          <input type="file" style={{margin:'10px'}} accept="image/*" onChange={handleImageChange} />
          <TextField
            label="Category"
            value={category}
            style={{margin:'10px'}}
            onChange={handleCategoryChange}
          />
          <Button type="submit" style={{margin:'10px'}} variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UploadImage;
