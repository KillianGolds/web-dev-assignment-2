import React, { useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from './pages/UpcomingMoviesPage';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import ActorsPage from "./pages/actorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import AuthContextProvider, { AuthContext } from "./contexts/authContext";import ProtectedRoutes from "./protectedRoute";

const queryClient = new QueryClient({ 
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const AuthContextConsumer = () => {
  const { authToken, userId } = useContext(AuthContext); // Get the authToken and userId from the AuthContext

  return ( 
    <MoviesContextProvider authToken={authToken} userId={userId}>
      <Routes> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/actors/:id" element={<ActorDetailsPage />} />
        <Route path="/actors/popular" element={<ActorsPage />} />
        <Route path="/reviews/:id" element={<MovieReviewPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
        </Route>
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MoviesContextProvider>
  );
}; // Render the routes

// This component renders the entire app
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
          <AuthContextConsumer />
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}; // Render the app

const rootElement = createRoot(document.getElementById("root")); // Get the root element
rootElement.render(<App />); 