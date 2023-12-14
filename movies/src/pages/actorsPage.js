import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPopularActors } from '../api/tmdb-api'; 
import ActorCard from '../components/actorCard'; 
import Spinner from '../components/spinner';
import PopularActorsHeader from '../components/headerPopularActors';
import Pagination from '@mui/material/Pagination';

const ActorsPage = () => {
  const [page, setPage] = useState(1); // State for the current page

  // Fetch the data for the current page
  const { data, isLoading, isError, error } = useQuery(['popular-actors', page], () => getPopularActors(page), {
    keepPreviousData: true, // Keep the previous data when fetching new data when changing pages
    staleTime: 3 * 60 * 60 * 1000, // 3 hours
  });

  // Handler for page changes
  const handlePageChange = (event, value) => { // The value parameter is the page number
    setPage(value); // Update the current page
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Rendering the list of actors with the ActorCard component
  return (
    <div className="actors-page">
      <PopularActorsHeader></PopularActorsHeader>
      <div className="actors-grid">
        {data.results.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
      </div>
      <Pagination
        count={data.total_pages} 
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        style={{ padding: 20, justifyContent: "center", display: "flex" }}
      />
    </div>
  );
};

export default ActorsPage;
