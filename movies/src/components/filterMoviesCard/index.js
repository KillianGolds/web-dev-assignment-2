import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/tmdb.jpg';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import { InputAdornment } from "@mui/material";
import { Button } from "@mui/material";

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  const { data: genres, error, isLoading, isError } = useQuery("genres", getGenres, {
    staleTime: 3 * 60 * 60 * 1000, 
  });

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (!genres.find(genre => genre.name === "All")) {
    genres.unshift({ id: "0", name: "All" });
  }

  // handle the change in input fields
  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  // handle the text change
  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  // handle the genre change
  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };
  
  // handle the vote average change
  const handleVoteAverageChange = (e) => { 
    handleChange(e, "vote_average", e.target.value);
  };

  // handle the release date change
  const handleReleaseDateChange = (e) => {
    handleChange(e, "release_date", e.target.value);
  };

  // reset filters and clear input fields
  const handleResetFilters = () => {
    props.onUserInput("name", "");
    props.onUserInput("genre", "0");
    props.onUserInput("vote_average", "");
    props.onUserInput("release_date", "");
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "rgb(160,44,172)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter movies.
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              if (genre) {
                return (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                );
              }
              return null;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControl }}>
          <TextField
              id="release-date-input"
              label="Release Date After"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={props.releaseDateFilter} 
              onChange={handleReleaseDateChange}
          />
        </FormControl>
        <FormControl sx={{ ...formControl }}>
          <TextField
            id="vote-average-input"
            label="Vote Average"
            type="number"
            InputProps={{
                startAdornment: <InputAdornment position="start">≥</InputAdornment>,
            }}
            value={props.voteAverageFilter} 
            onChange={handleVoteAverageChange}
          />
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 245 }}
        image={img}
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Explore movies.
          <br />
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleResetFilters} 
          sx={{ 
            marginTop: 2, 
            backgroundColor: "rgba(100,65,163,255)", 
            width: '100%' 
          }}
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}

