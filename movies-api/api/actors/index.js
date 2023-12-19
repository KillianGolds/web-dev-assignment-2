import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

// Get the top rated actors
router.get('/popular', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status); // Set the status code from TMDB response
      throw new Error(`TMDB API responded with status: ${response.status}`);
    } // Get the results array from the response
    const data = await response.json();
    res.json(data);
  })); 
  
  // Get the details of an actor
  router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the actor ID from the URL parameters
    const url = `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&append_to_response=combined_credits`;
    const response = await fetch(url);
    if (!response.ok) {
      res.status(response.status); // Set the status code from TMDB response
      throw new Error(`TMDB API responded with status: ${response.status}`);
    } // Get the results array from the response
    const data = await response.json();
    res.json(data);
  }));

export default router;