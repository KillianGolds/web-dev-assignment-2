import React, { useState } from "react";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import PageTemplate from '../components/templateMovieListPage';
import { getLatestMovies, getTrendingMovies, getTopRatedMovies, getMovies } from "../api/tmdb-api";
import './homePage.css';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Box, useMediaQuery, useTheme } from '@mui/material';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('discover'); // Set the active tab to 'discover' by default
  const [sortOption, setSortOption] = useState('none');   // Set the sort option to 'none' by default
  const theme = useTheme(); 
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the screen size is small

  // Fetching the movies data based on the active tab
  const { data, error, isLoading, isError } = useQuery(['movies', activeTab], () => {
    console.log(`Fetching movies for tab: ${activeTab}`);
    switch (activeTab) {
      case 'latest':
        return getLatestMovies();
      case 'trending':
        return getTrendingMovies();
      case 'top-rated':
        return getTopRatedMovies();
      default:
        return getMovies();
    }
  }, {
    staleTime: 3 * 60 * 60 * 1000, // cache for 3 hours
  });

  const sortedMovies = React.useMemo(() => { // Memoize the sort function to avoid re-runs
    let moviesArray = activeTab === 'latest' ? data : data?.results;

    // If there are no movies, return an empty array
    if (!moviesArray || moviesArray.length === 0) {
      console.log('No results to sort.');
      return [];
    }
    // If no sorting option is selected, return the movies as-is
    if (sortOption === 'none') {
      console.log('No sorting applied.');
      return moviesArray; // No sorting
    }

    return [...moviesArray].sort((a, b) => { // Sort the movies array
      switch (sortOption) {
        case 'popularity.desc':
          return b.popularity - a.popularity; 
        case 'popularity.asc':
          return a.popularity - b.popularity;
        case 'release_date.desc':
          return new Date(b.release_date) - new Date(a.release_date);
        case 'release_date.asc':
          return new Date(a.release_date) - new Date(b.release_date);
        case 'title.asc':
          return a.title.localeCompare(b.title);
        case 'title.desc':
          return b.title.localeCompare(a.title);
        case 'vote_average.asc':
          return a.vote_average - b.vote_average;
        case 'vote_average.desc':
          return b.vote_average - a.vote_average;
        default:
          return 0; // No sorting
        }
      });
    }, [data, sortOption, activeTab]); // Re-run the sort function if the data, sort option, or active tab changes

    // Handle the sorting option change
    const handleSortChange = (event) => {
      console.log(`Sorting option changed to: ${event.target.value}`); // For debugging
      setSortOption(event.target.value); // Set the sort option to the selected value
    };
  
    if (isLoading) {
      return <Spinner />; // If the data is still loading, show the Spinner component
    }
    if (isError) {
      return <h1>{error.message}</h1>; // If there's an error in fetching data, display the error message
    }

    console.log("Movies passed to PageTemplate:", sortedMovies); // For debugging

  // Return the page
  return (
    <>
      <Box className="top-controls" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing(1) }}>
        <div className="tab-container" style={{ flexGrow: isMobile ? 1 : 0 }}> {/* Grow the tab container to fill the space on mobile */}
          <button
            className={activeTab === 'discover' ? 'active' : ''}
            onClick={() => setActiveTab('discover')}
          >
            Discover
          </button>
          <button
            className={activeTab === 'top-rated' ? 'active' : ''}
            onClick={() => setActiveTab('top-rated')}
          >
            Top Rated
          </button>
          <button
            className={activeTab === 'trending' ? 'active' : ''}
            onClick={() => setActiveTab('trending')}
          >
            Trending
          </button>
          <button 
            className={activeTab === 'latest' ? 'active' : ''}
            onClick={() => setActiveTab('latest')}
          >
            Latest
          </button>
      </div>
      {/* Sorting Options UI */}
      <FormControl className="sorting-dropdown" sx={{ minWidth: isMobile ? 120 : 180 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sortOption}
          label="Sort By"
          onChange={handleSortChange}
        > 
          <MenuItem value="none">No Sorting</MenuItem>
          <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
          <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
          <MenuItem value="release_date.desc">Release Date Descending</MenuItem>
          <MenuItem value="release_date.asc">Release Date Ascending</MenuItem>
          <MenuItem value="title.asc">Title A-Z</MenuItem>
          <MenuItem value="title.desc">Title Z-A</MenuItem>
          <MenuItem value="vote_average.asc">Rating Ascending</MenuItem>
          <MenuItem value="vote_average.desc">Rating Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  
      <PageTemplate
        title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Movies`}
        movies={sortedMovies}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    </>
  );
};

export default HomePage;