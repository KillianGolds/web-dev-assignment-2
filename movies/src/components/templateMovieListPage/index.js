import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
  // Initializing state for name and genre filters
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [voteAverageFilter, setVoteAverageFilter] = useState(0);
  const [releaseDateFilter, setReleaseDateFilter] = useState("");
  const genreId = Number(genreFilter);
  // Filtering logic for movies based on name and genre filters
  let displayedMovies = Array.isArray(movies) ? movies
    .filter((m) => {
      // First filter: Selects movies that contain the search term in their title
      return m.title && m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      // Second filter: Selects movies of a specific genre, if a genre is chosen
      return genreId > 0 ? m.genre_ids && m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      // Third filter: Selects movies with a vote average greater than or equal to the specified value
      return voteAverageFilter ? m.vote_average >= voteAverageFilter : true;
    })
    .filter((m) => {
      // Fourth filter: Selects movies with a release date greater than or equal to the specified value
      return releaseDateFilter ? new Date(m.release_date) >= new Date(releaseDateFilter) : true;
    })
    : []; // If the movies array is undefined, use an empty array

  // Function to handle changes in name, genre, vote average, and release date filters
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value); 
    else if (type === "vote_average") setVoteAverageFilter(value ? Number(value) : 0); // Reset to 0 if value is empty
    else if (type === "release_date") setReleaseDateFilter(value); // Reset to "" if value is empty
  };


  // Rendering the page layout using Material-UI Grid
  return (
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            voteAverageFilter={voteAverageFilter} 
            releaseDateFilter={releaseDateFilter} 
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
