/*=======================================================
 Endpoints that were modified for the second assignment
=======================================================*/

// Get genres endpoint
export const getGenres = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/genres`);  
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  return response.json(); 
};

// Get movies endpoint
export const getMovies = () => {
  return fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/discover`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};

// Get movie details endpoint
export const getMovie = async ({ queryKey }) => {
  const [_key, { id }] = queryKey;
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/movie/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Get movie reviews endpoint
export const getMovieReviews = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/movie/${id}/reviews`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie reviews');
  }
  return response.json();
};

// Get upcoming movies endpoint
export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/upcoming?page=${page}`);
  if (!response.ok) {
      throw new Error('Failed to fetch upcoming movies');
  }
  return response.json();
};

// Get popular actors endpoint
export const getPopularActors = async (page = 1) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/actors/popular?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular actors');
  }
  return response.json();
};

// Get actor details endpoint
export const getActorDetails = async (actorId) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/actors/${actorId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch actor details');
  }
  return response.json();
};

// Get movie cast endpoint
export const getMovieCast = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/${id}/cast`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie cast');
  }
  return response.json();
};

// return search results
export const getSearchResults = async (query) => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  return response.json();
};

/*=================================================
 Untouched endpoints from the first assignment
=================================================*/

// Get trending movies endpoint
export const getTrendingMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching trending movies');
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

// Get top rated movies endpoint
export const getTopRatedMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching top rated movies');
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

// Get latest movies endpoint 
export const getLatestMovies = () => {
  const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&release_date.lte=${currentDate}` // Only return movies released before or on the current date
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching the latest movies');
    }
    return response.json();
  })
  .then((data) => {
    console.log("Latest movies data:", data);
    return data.results;
  })
  .catch((error) => {
    throw error;
  });
};

// Get movie images endpoint
export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
  .catch((error) => {
    throw error
  });
};
