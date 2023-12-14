import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from '@mui/material/styles';
import { genderMap } from "../util";
import img from '../images/film-poster-placeholder.png'
import ActorHeader from "../components/headerActor";
import { Grid, useMediaQuery, useTheme } from '@mui/material';

// Styled paper component for the actor details page
const Item = styled(Paper)(({ theme }) => ({ 
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// This component represents a movie card on the actor's page. 
const ActorPageMovieCard = ({ movie }) => { // Receives the movie as a prop
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/movies/${movie.id}`); // Navigate to MovieDetailsPage on click
  };
  // Returns a grid item containing the movie poster, title, and character name they played.
  return (
    <Grid item xs={6} sm={4} md={3} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
        alt={movie.title}
        style={{ width: '100%', height: 'auto' }}
      />
      <Typography variant="subtitle1">{movie.title}</Typography>
      <Typography variant="body2">{movie.character}</Typography>
    </Grid>
  );
};

// This component represents the actor details page.
const ActorDetailsPage = () => {
  const { id } = useParams(); // Extracts the actor ID from the URL
  const { data: actor, isLoading, isError, error } = useQuery( // Fetches the actor details
    ['actor', id], 
    () => getActorDetails(id), 
    {
      staleTime: 3 * 60 * 60 * 1000, // Caches data for 3 hours
    }
  );

  const theme = useTheme(); // Initializes theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Checks if screen is small

  // Returns a loading message while the data is fetching
  if (isLoading) {
    return <Spinner />;
  }
  // Returns an error message if there's an error in fetching data
  if (isError) {
    return <Typography variant="h2">{error.message}</Typography>;
  }

  const knownFor = actor.combined_credits.cast; // Movies the actor is known for

  // Returns the actor details page
  return (
    <>
      <ActorHeader actorName={actor?.name} />
      <Grid container spacing={5} sx={{ padding: isSmallScreen ? "5px" : "15px" }}>
        <Grid item xs={12} md={4}>
          <Item>
            <img
              style={{ width: "100%", height: "auto" }}
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
            />
            <Typography variant="h6">Gender: {genderMap[actor.gender]}</Typography>
            <Typography variant="h6">Birthday: {actor.birthday}</Typography>
            <Typography variant="h6">Place of Birth: {actor.place_of_birth}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={8}>
          <Item>
            <Typography variant="h4">Biography</Typography>
            <Typography>{actor.biography}</Typography>
            <Typography variant="h4">Known For</Typography>
            <Grid container spacing={2}>
              {knownFor.map(movie => (
                <ActorPageMovieCard key={movie.id} movie={movie} />
              ))}
            </Grid>
            {}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default ActorDetailsPage;
