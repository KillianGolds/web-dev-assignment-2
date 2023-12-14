// Importing necessary React libraries and hooks
import React from 'react';
import { useQuery } from 'react-query';
import { getActorDetails } from '../../api/tmdb-api';
import './actorCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { genderMap } from "../../util";

// Component to display an actor's card
const ActorCard = ({ actor }) => {
  const { data: actorDetails, isLoading, isError, error, } = useQuery(['actorDetails', actor.id], () => getActorDetails(actor.id), {
    staleTime: 1000 * 60 * 60 * 24, // Cache the data for 24 hours
  });

  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle card click
  const handleClick = () => {
    navigate(`/actors/${actor.id}`);
  };

  // Display a loading message while the data is being fetched
  if (isLoading) return <div>Loading...</div>;
  // Display an error message if there's an error in fetching data
  if (isError) return <div>Error: {error.message}</div>;

  // Rendering the actor's card
  return (
    <div className="actor-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="actor-card">
        {/* Actor's image */}
        <img
          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
          alt={actor.name}
          className="actor-image"
        />
        <div className="actor-details">
          {/* Actor's name */}
          <h3 className="actor-name">{actor.name}</h3>
          {/* Actor's gender, mapped from a number to text */}
          <p className="actor-gender">Gender: {genderMap[actor.gender]}</p>
          {/* Actor's aliases, if any */}
          {actorDetails.also_known_as && (
            <p className="actor-also-known-as">Also known as: {actorDetails.also_known_as.join(', ')}</p>
          )}
          {/* Actor's birthday */}
          <p className="actor-birthday">Birthday: {actorDetails.birthday}</p>
          {/* Actor's deathday, if applicable */}
          {actorDetails.deathday && <p className="actor-deathday">Deathday: {actorDetails.deathday}</p>}
          <Link to={`/actors/${actor.id}`} className="button more-info">
            More Info
          </Link>
          <a
            href={`https://www.themoviedb.org/person/${actor.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button tmdb-profile"
          >
            TMDB Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActorCard;
