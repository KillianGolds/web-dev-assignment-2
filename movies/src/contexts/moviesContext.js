import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

// This component is the context provider for movie related components. It provides movie related state and functions to child components.
const MoviesContextProvider = ({ children, authToken, userId }) => {  
  const [favorites, setFavorites] = useState([]); // Initialize favorites state variable to an empty array
  const [myReviews, setMyReviews] = useState({}); // Initialize myReviews state variable to an empty object
  const [mustWatch, setMustWatch] = useState([]); 
  const [favoriteIdsCallback, setFavoriteIdsCallback] = useState(() => () => {}); // Callback function to update favorite IDs

  const addReview = (movie, review) => {
    setMyReviews({...myReviews, [movie.id]: review});
  };

  // This function is called to add a movie to the user's favorites array in the database.
  const addToFavorites = async (movie) => {
    const authToken = localStorage.getItem("token"); 
    if (!favorites.includes(movie.id.toString())) { // Convert movie ID to string for comparison
      try {
        console.log('UserId:', userId, 'AuthToken:', authToken);
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/favorites`, { // Send a POST request to the backend
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
          },
          body: JSON.stringify({ movieId: movie.id.toString() }) 
        });
        if (!response.ok) {
          const errorBody = await response.text(); // Get the error message from the response body
          console.error('Failed to add to favorites. Response:', errorBody); // Log the error message
          throw new Error('Failed to add to favorites');
        }
        const updatedFavorites = [...favorites, movie.id.toString()]; // Ensure movie ID is a string in state
        setFavorites(updatedFavorites); // Update the favorites state variable
        console.log('Added to favorites:', movie.id); // Log the updated favorites list
      } catch (error) {
        console.error('Failed to add to favorites. Error:', error); // Log the error
      }
    }
  };
  
  // This function is called to remove a movie from the user's favorites array in the database.
  const removeFromFavorites = async (movieId) => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      console.error("Authentication token not found");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userId}/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${authToken}`,
        },
      });
      if (!response.ok) {
        const errorBody = await response.text(); // Get the error message from the response body
        console.error('Failed to remove from favorites. Response:', errorBody); // Log the error message
        throw new Error('Failed to remove from favorites');
      }
      const updatedFavorites = favorites.filter((id) => id !== movieId.toString()); // Ensure movie ID is a string in state
      setFavorites(updatedFavorites); // Update the favorites state variable
      console.log('Removed from favorites:', movieId); // Log the updated favorites list
      favoriteIdsCallback(); // Call the callback function to update favorite IDs on successful movie removal
    } catch (error) {
      console.error('Failed to remove from favorites. Error:', error);
    }
  };
  
  const addToMustWatch = (movie) => {
    if (!mustWatch.includes(movie.id)) {
      const newMustWatch = [...mustWatch, movie.id];
      setMustWatch(newMustWatch);
      console.log('Must Watch List:', newMustWatch); // Log the updated 'Must Watch' list
    }
  };

  // This function is called to update the favorite IDs in the movie list when a movie is removed from favorites.
  const updateFavoriteIds = (callback) => {
    setFavoriteIdsCallback(() => callback);
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        myReviews,
        addReview,
        mustWatch,
        addToMustWatch,
        updateFavoriteIds
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;