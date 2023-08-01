import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css'; // Create a separate CSS file for the navbar if needed

const NavBar = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of players from the API
    axios.get('http://localhost:8081/player')
      .then(response => {
        setPlayers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError('Failed to fetch players data');
        console.error(error);
      });
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">Home</Link>
        <div className="dropdown">
          <button className="dropbtn">Players</button>
          <div className="dropdown-content">
            {loading ? (
              <p>Loading players...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              players.map((player) => (
                <Link key={player.id} to={`/player/${player.id}`}>
                  {player.name}
                </Link>
              ))
            )}
          </div>
        </div>
        {/* Add other links for navigation */}
      </div>
    </nav>
  );
};

export default NavBar;
