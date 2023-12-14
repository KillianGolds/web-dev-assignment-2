import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Button, 
  Typography, Avatar, Grid, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import { MoviesContext } from "../../contexts/moviesContext";
import img from '../../images/film-poster-placeholder.png';

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext); // Get favorites from context
  const [expanded, setExpanded] = useState(false); 

  // Toggle accordion on hover
  const handleExpandChange = () => {
    setExpanded(!expanded);
  };

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  return (
    <Card sx={{ maxWidth: 345 }} onMouseEnter={handleExpandChange} onMouseLeave={handleExpandChange}>
      <CardHeader avatar={ 
        movie.favorite ? (
          <Avatar sx={{ backgroundColor: 'red' }}>
            <FavoriteIcon />
          </Avatar> 
        ) : null
      }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={7}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {"  "} {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Accordion expanded={expanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Overview</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{movie.overview}</Typography>
        </AccordionDetails>
      </Accordion>
      <CardActions disableSpacing>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
