import "./App.css"
import React, { Component } from 'react';
import axios from 'axios';

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

  render() {
    const { data, loading, error } = this.state;

    return (
      <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Games</th>
              <th>Goals</th>
              {/* Add more headers for other properties if needed */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td>{item.games}</td>
                <td>{item.goals}</td>
                {/* Add more cells for other properties if needed */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}
}

export default App;