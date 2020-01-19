import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      books: [],
    };
  }

  componentDidMount() {
    return fetch('http://localhost:3001/books')
      .then((res) => res.json())
      .then((resJson) => {
        this.setState({
          loading: true,
          books: resJson.books,
        });
        console.log();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  printTable = () => {
    const booktable = this.state.books.map((books) =>
      <tr key="bookslist">
        <td>
          {books.title}
        </td>
        <td>
          {books.author}
        </td>
        <td>
          {books.isbn}
        </td>
      </tr>
    );

    return (
      <table border="1" cellSpacing="0">
        <thead>
          <tr>
            <th>タイトル</th>
            <th>著者</th>
            <th>isbnコード</th>
          </tr>
        </thead>
        <tbody>
          {booktable}
        </tbody>
      </table>
    );
  }

  badprintmessage() {
    return (
      <div className="App-header">
        <p>sorry...</p>
        <p>loading now...</p>
      </div>
    );
  }

  render() {
    if(this.state.loading) {
      return(
        <div className="booksDetail">
          <this.printTable />
        </div>
      );
    }
    else {
      return(
        <div className="cannotLoadJson">
          <this.badprintmessage />
        </div>
      );
    }
  }
}

export default App;
