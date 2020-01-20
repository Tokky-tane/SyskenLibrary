import React from 'react';
import {HashRouter, Route, Switch, Link} from 'react-router-dom';
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
      <table cellSpacing="0">
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

  newbookregister() {
    return (
      <div className="bookregister">
        <button className="registarbutton" >新しい本を登録</button>
      </div>
    );
  }

  badprintmessage() {
    return (
      <div className="unable_toload">
        <p>unable to load...</p>
      </div>
    );
  }

  render_detail = () => {
    return (
      <div className="bookdetail">
        <this.printTable />
        <this.newbookregister />
      </div>
    );
  }

  render() {
    if(this.state.loading) {
      return(
/*        <HashRouter>
          <div>
            <ul>
              <li><Link to='/'>一覧</Link></li>
              <li><Link to='/submit'>登録</Link></li>
            </ul>
            <Switch>
              <Route exact path='/' Component={this.render_ditail} />
              <Route path='/submit' Component={<p>//////////</p>} />
            </Switch>
          </div>
        </HashRouter>*/
        <this.render_detail />
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
