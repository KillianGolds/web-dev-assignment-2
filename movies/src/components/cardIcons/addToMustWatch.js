import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"; // Icon for 'Must Watch'

const AddToMustWatchIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToMustWatch = (e) => {
    e.preventDefault();
    context.addToMustWatch(movie); // Use the 'addToMustWatch' function from context
    console.log(`Movie ${movie.id} added to Must Watch list`);
  };

  return (
    <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
      <PlaylistAddIcon color="secondary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
