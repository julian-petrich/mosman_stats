import React, { Component } from 'react';
import axios from 'axios';
import { Table, Alert, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./App.css";
import NavBar from './routes/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    data: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    // Place your API call here
    this.fetchData();
  }

  fetchData() {
    // Replace 'http://localhost:8080/player' with your actual API endpoint
    axios.get('http://localhost:8081/player')
      .then(response => {
        // Update the state with the fetched data
        this.setState({
          data: response.data,
          loading: false,
        });
      })
      .catch(error => {
        // Handle any errors that occurred during the API call
        this.setState({
          loading: false,
          error: 'Failed to fetch data',
        });
        console.error(error);
      });
  }
  renderTable(position) {
    const { data } = this.state;
    const filteredData = data.filter(item => item.position === position);

    return (
    <div key={position} className={`table-container table-container-${position.toLowerCase()}`}>
        <h2>{position}</h2>
        {filteredData.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Games</th>
                <th>Goals</th>
                {/* Add more headers for other properties if needed */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                   <td>
                   <Link to={`/player/${item.id}`}>{item.name}</Link>
                    </td>
                  <td>{item.games}</td>
                  <td>{item.goals}</td>
                  {/* Add more cells for other properties if needed */}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No data found for {position}.</p>
        )}
      </div>
    );
  }


  render() {
    const { loading, error } = this.state;

    return (
      <div className="center">
      <NavBar />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <div className="image-container">
              <img src="/mosman_team.jpeg" alt="Mosman Team" />
            </div>
            <div className="table-container-wrapper">
            {this.renderTable('Goalkeeper')}
            {this.renderTable('Defender')}
            {this.renderTable('Midfielder')}
            {this.renderTable('Forward')}
            </div>

          </>
        )}
      </div>
    );
  }
}

export default App;
