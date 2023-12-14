// Importing React and the component's CSS
import React from "react";
import { useNavigate } from "react-router-dom";
import './CastList.css';
import img from '../../images/portrait_placeholder.png'

// The CastList component receives the cast data as a prop
const CastList = ({ cast }) => {
  const navigate = useNavigate(); 
  if (!Array.isArray(cast)) {   
    return <div>No cast information available.</div>; // If there's no cast data, display this message
  }

  return (
    <div className="cast-container">
      <h2>Cast</h2>
      <div className="cast-cards">
        {cast.map((member) => {
          const handleCardClick = () => {
            navigate(`/actors/${member.id}`);
          };

          return (
            <div key={member.cast_id} className="cast-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}> 
              <img
                src={member.profile_path ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : img}
                alt={member.name}
                className="cast-image"
              />
              <div className="cast-details">
                <h3 className="cast-name">{member.name}</h3>
                <p className="cast-character">as {member.character}</p>
                <p className="cast-popularity">Popularity: {member.popularity}</p>
                {}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CastList;
