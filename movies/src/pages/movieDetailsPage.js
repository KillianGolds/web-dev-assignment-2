// Importing necessary React components and hooks
import React from "react";
import { useParams } from 'react-router-dom'; 
import MovieDetails from "../components/movieDetails/";
import CastList from "../components/castList/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCast } from '../api/tmdb-api';
import { useQuery } from "react-query"; 
import Spinner from '../components/spinner'; 
import { useMediaQuery, useTheme } from '@mui/material';

// The main component for the movie page
const MoviePage = () => {
  const { id } = useParams(); // Extracting the movie ID from the URL

  const staleTime = 3 * 60 * 60 * 1000; // 3 hours
 
  // Fetching the movie data using the movie ID
  const { data: movie, error: movieError, isLoading: isMovieLoading, isError: isMovieError } = useQuery(
    ["movie", { id }],
    getMovie,
    { staleTime } // Set stale time for movie data
  );

  // Fetching the cast data for the movie
  const { data: cast, castError, isLoading } = useQuery(['movieCast', id], () => getMovieCast(id));

  const theme = useTheme(); 
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Using the useMediaQuery to check if the screen size is small
  
  // If the movie or cast data is still loading, show the Spinner component
  if (isMovieLoading || isLoading) {
    return <Spinner />;
  }

  // If there's an error in fetching movie data, display the error message
  if (isMovieError) {
    return <h1>{movieError.message}</h1>;
  }

  // if there's an error in fetching cast data, display this error message
  if (castError) {
    return <h1>{castError.message}</h1>;
  }

  // Rendering the movie page template with movie details and cast list, only if the movie data is available
  return (
    <> 
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} isSmallScreen={isSmallScreen} /> 
          <CastList cast={cast} isSmallScreen={isSmallScreen} />
        </PageTemplate>
      ) : (
        <h2>Movie not found</h2>
      )}
    </>
  );
};

// Exporting the component for use in other parts of the app
export default MoviePage;
