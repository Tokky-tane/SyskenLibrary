import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    return fetch('http://localhost:3001/books')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          loading: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sucprintmessage() {
    return (
      <div className="App-header">
        <p>sucsess!</p>
      </div>
    );
  }

  badprintmessage() {
    return (
      <div className="App-header">
        <p>Loading...</p>
      </div>
    );
  }

  render() {
    if(this.state.loading) {
      return(
        this.sucprintmessage()
      );
    }
    else {
      return(
        this.badprintmessage()
      );
    }
  }
}

export default App;
