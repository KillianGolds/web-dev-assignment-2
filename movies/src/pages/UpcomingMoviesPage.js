import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUpcomingMovies } from '../api/tmdb-api';
import PageTemplate from '../components/templateMovieListPage';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import Pagination from '@mui/material/Pagination';

const UpcomingMoviesPage = () => {
    const [page, setPage] = useState(1); // State to track the current page

    // Update the useQuery hook to pass the current page to getUpcomingMovies
    const { data, error, isLoading, isError } = useQuery(['upcomingMovies', page], () => getUpcomingMovies(page), {
        keepPreviousData: true,
        staleTime: 5 * 60 * 1000,
    });

    // Handle page change event
    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0); // Scroll to top when page changes
    };

    // Return error message if there is an error, otherwise render the page
    if (isLoading) {
        return <p>Loading...</p>; // Loading indicator
    }
    if (isError) {
        return <p>Error: {error.message}</p>; // Error message
    }


    // Render the page
    return (
        <>
            <PageTemplate
                title="Upcoming Movies"// Title to display in header
                movies={data.results} // Movies to display
                action={(movie) => <AddToMustWatchIcon movie={movie} />} // Icon to display in each movie card
            />
            <Pagination
                count={data.total_pages} // Total number of pages
                page={page} // Current page number
                onChange={handlePageChange} // Handle page change event
                color="primary" // Color of the component
                size="large" // Size of the component
                showFirstButton // Show the first page button
                showLastButton // Show the last page button
                style={{ padding: 20, justifyContent: "center", display: "flex" }} 
            />
        </>
    );
};

export default UpcomingMoviesPage;
