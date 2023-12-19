import React, { useContext, useCallback, useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { AuthContext } from "../contexts/authContext";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

// This component renders the a specific users favourites page
const FavoriteMoviesPage = () => {
  const { userId } = useContext(AuthContext); // Get the user ID from the AuthContext
  const { updateFavoriteIds } = useContext(MoviesContext); // Get the updateFavoriteIds function from the MoviesContext
  const [favoriteMovieIds, setFavoriteMovieIds] = useState([]); // Initialize favoriteMovieIds state variable to an empty array

  // This function is called to fetch the user's favorites from the database
  const fetchFavorites = useCallback(async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken || !userId) {
      console.error("No auth token found in local storage or user ID is missing.");
      return;
    } // If the auth token or user ID is missing, log an error and return
    try { // Try to fetch the user's favorites from the database
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/favorites`, {
        headers: {
          'Authorization': `${authToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw an error if the response is not ok
      }
      const data = await response.json(); // Get the favorites from the response
      setFavoriteMovieIds(data.favorites || []); // Update the favoriteMovieIds state variable
    } catch (error) { 
      console.error("Failed to fetch favorites:", error); // Log the error
    }
  }, [userId]);

  // This function is called to update the favoriteMovieIds state variable
  useEffect(() => {
    updateFavoriteIds(fetchFavorites);
    fetchFavorites();
  }, [userId, updateFavoriteIds, fetchFavorites]);

  // This function is called to fetch the movie data for each movie in the user's favorites
  const favoriteMovieQueries = useQueries(
    favoriteMovieIds.map((movieId) => ({
      queryKey: ['movie', { id: movieId }],
      queryFn: getMovie,
      staleTime: 3 * 60 * 60 * 1000,
      enabled: !!movieId
    }))
  );

  // This function is called to check if the favorites are loading
  const isLoading = favoriteMovieQueries.some((query) => query.isLoading); 
  const movies = favoriteMovieQueries // Get the movie data for each movie in the user's favorites
    .filter((query) => query.isSuccess) // Filter out any movies that failed to load
    .map((query) => query.data); // Get the movie data from each query

  // Show a styled message if the favorites list is empty and loading is done
  if (!isLoading && !favoriteMovieIds.length) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '50px',
        color: 'white', 
        backgroundColor: '#6441a3', 
        margin: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>User has added no favorites yet!</h2>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;
