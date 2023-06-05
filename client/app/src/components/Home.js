import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Grid } from "@mui/material";

function Home() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    await axios
      .get("http://localhost:5000/api/getImages")
      .then(function (response) {
        console.log(response);
        setImages(response.data);
      });
  };

  return (
    <div style={{marginTop:'20px'}}>
      <Grid container spacing={2}>
        {images.map((image) => {
          return (
            <Grid item xs={4}>
              {" "}
              <Card sx={{ maxWidth: 345 }}>
                {console.log(image.filepath)}
                <CardMedia
                  sx={{ height: 200 }}
                  image={image.filepath}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                   {image.fileName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  {image.category}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
