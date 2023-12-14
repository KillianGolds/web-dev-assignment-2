export const getMovies = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

export const getGenres = async () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      process.env.REACT_APP_TMDB_KEY +
      "&language=en-US"
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

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};


/*===================================
My added endpoints from here on 
===================================*/

export const getUpcomingMovies = async (page) => { 
  const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  );
  if (!response.ok) {
      throw new Error(response.statusText);
  }
  return response.json();
};

// Get popular actors endpoint
export const getPopularActors = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${page}`
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching popular actors');
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

// Get actor details endpoint
export const getActorDetails = (actorId) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=combined_credits`
  )
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to fetch actor details.');
    }
    return res.json();
  })
  .catch(error => {
    throw error;
  });
};

// Get movie cast endpoint
export const getMovieCast = ({ queryKey }) => {
  const [, { id }] = queryKey;
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error('Error fetching movie cast');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Cast data:', data); // Logging the data to the console for debugging purposes
    return data.cast; // Returning the cast data from the response
  })
  .catch((error) => {
    throw error;
  });
};

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

// return search results
export const getSearchResults = async (query) => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&api_key=${process.env.REACT_APP_TMDB_KEY}`;
  const response = await fetch(url); // Fetch search results
  if (!response.ok) {
    throw new Error('Network response was not ok.'); // Throw an error if the response is not ok
  }
  return response.json(); // Return the response data as JSON
};
