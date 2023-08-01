import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import "./player.css";
import NavBar from './NavBar';


const PlayerDetails = () => {
  const { id } = useParams(); // Access the 'id' parameter from the URL using useParams

  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use the 'id' parameter from the URL to call your API and fetch data for the specific player
    axios.get(`http://localhost:8081/player/${id}`)
      .then(response => {
        setPlayerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError('Failed to fetch player data');
        console.error(error);
      });
  }, [id]); // Adding 'id' as a dependency will trigger the useEffect whenever 'id' changes

  if (loading) {
    return <p>Loading player data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="center">
    <NavBar />
      {playerData && (
        <div>
        <h2>{playerData.name}</h2>
        <div className="table-container-wrapper">
          <p>Position: {playerData.position}</p>
          <p>Games: {playerData.games}</p>
          <p>Goals: {playerData.goals}</p>
          {/* Render other player details if needed */}
        </div>
        </div>
      )}
    </div>
  );
};

export default PlayerDetails;
