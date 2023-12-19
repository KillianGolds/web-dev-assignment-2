import asyncHandler from 'express-async-handler';
import express from 'express';

const router = express.Router();

// Handler to fetch movies from TMDB
router.get('/discover', asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const movies = await response.json();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));

// Handler to fetch a specific movie from TMDB
router.get('/movie/:id', asyncHandler(async (req, res) => {
    console.log("Movie ID:", req.params.id);
    const { id } = req.params;
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        const movieDetails = await response.json();
        res.status(200).json(movieDetails);
    } catch (error) { // Catch any errors and send them to the error handler
        if (error.response) { // If the error is an HTTP Error, log the error message and status
            console.log(error.response.data); 
            console.log(error.response.status);
            console.log(error.response.headers);
            res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) {
            console.log(error.request);
            res.status(500).json({ message: "No response was received from TMDB API" });
        } else {
            console.log('Error', error.message);
            res.status(500).json({ message: error.message });
        }
    }
}));

// Handler to fetch a movie reviews from TMDB
router.get('/movie/:id/reviews', asyncHandler(async (req, res, next) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${req.params.id}/reviews?api_key=${process.env.TMDB_KEY}`);
  if (!response.ok) {
    res.status(response.status); 
    throw new Error('Failed to fetch movie reviews from TMDB');
  }
  const data = await response.json();
  res.json(data.results);
}));

// Handler to fetch upcoming movies from TMDB
router.get('/upcoming', asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`;
  const response = await fetch(url);
  if (!response.ok) {
    res.status(response.status);
    throw new Error(`TMDB API responded with status: ${response.status}`);
  }
  const data = await response.json();
  res.json(data);
}));

// Handler to fetch genres from TMDB
router.get('/genres', asyncHandler(async (req, res) => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`;
  const response = await fetch(url);
  if (!response.ok) {
    console.error('TMDB response not OK:', await response.text());
    res.status(response.status); // Set the status code from TMDB response
    throw new Error(`TMDB API responded with status: ${response.status}`);
  }
  const data = await response.json();
  res.json(data.genres);
}));

// Handler to fetch a specific movies cast from TMDB
router.get('/:id/cast', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    res.status(response.status); // Set the status code from TMDB response
    throw new Error(`TMDB API responded with status: ${response.status}`);
  }
  const data = await response.json();
  res.json(data.cast);
}));

// Handler to fetch movies or actor by seach query from TMDB
router.get('/search', asyncHandler(async (req, res) => {
  const { query } = req.query;
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    res.status(response.status); // Set the status code from TMDB response
    throw new Error(`TMDB API responded with status: ${response.status}`);
  }
  const data = await response.json();
  res.json(data);
}));

export default router;