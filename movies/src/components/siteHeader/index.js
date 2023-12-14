import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getSearchResults } from '../../api/tmdb-api';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar); // Toolbar offset

const SiteHeader = () => {
  const [options, setOptions] = useState([]);

  // Function to fetch search results
  const fetchSearchResults = async (query) => {
    if (query.length > 2) { // Only fetch results if the query is longer than 2 characters
      const response = await getSearchResults(query); // Fetch search results
      const filteredResults = response.results.filter( // Filter out TV shows
        (result) => result.media_type !== "tv" // Exclude TV shows from the results
      );
  
      setOptions(filteredResults); // Update search results
    }
  };
  
  // Handle search input change
  const handleSearchChange = (event, value) => {
    fetchSearchResults(value);
  };

  // Handle selection of search result
  const handleSearchSelect = (event, value) => {
    if (value) {
      const route = value.media_type === 'movie' ? '/movies/' : '/actors/'; // Determine the route based on the media type
      navigate(`${route}${value.id}`); // Navigate to the movie or actor page
    }
  };
  
  const navigate = useNavigate();

  // Menu options
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Actors", path: "/actors/popular" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
          <Autocomplete
            freeSolo
            id="search-autocomplete"
            disableClearable
            options={options}
            getOptionLabel={(option) => option.title || option.name}
            onInputChange={handleSearchChange}
            onChange={handleSearchSelect}
            style={{ width: 300, flexGrow: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search movies/actors..."
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  style: { backgroundColor: 'white' },
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </>
                  ),
                }}
              />
            )}
          />
          <div style={{ flexGrow: 2, display: 'flex', justifyContent: 'flex-end' }}>
            {menuOptions.map((opt) => (
              <Button
                key={opt.label}
                color="inherit"
                onClick={() => handleMenuSelect(opt.path)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
}
export default SiteHeader;