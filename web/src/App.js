import React from 'react';
import {HashRouter, Route, Switch, Link} from 'react-router-dom';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      books: [],
      newbooks: {
        title: '',
        author: '',
        isbn: '',
      },
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
          <a>
            {books.title}
          </a>
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

  submitbookform = () => {
    return (
      <div>
          <form id="newbook">
            <h3>タイトル</h3>
            <input name="title" type="textbox" value={this.state.newtitle} onChange={event => this.submitnewbook(event)}></input>
            <h3>著者</h3>
            <input name="author" type="textbox" value={this.state.newauthor} onChange={event => this.submitnewbook(event)}></input>
            <h3>isbnコード</h3>
            <input name="isbn" type="textbox" value={this.state.newisbn} onChange={event => this.submitnewbook(event)}></input>
            <br />
            <button onClick={() => this.postnewbook()}>登録</button>
        </form>
      </div>
    );
  }

  submitnewbook(event) {
    var book = this.state.newbooks;

    switch (event.target.name)
    {
      case 'title':
        book.title = event.target.value;
        break;
      case 'author':
        book.author = event.target.value;
        break;
      case 'isbn':
        book.isbn = event.target.value;
        break;
    }

    this.setState({newbooks: book});
  }

  postnewbook = () => {
    const newbookdata = { title: (this.state.newbooks.title),
                          author: (this.state.newbooks.author),
                          isbn: (this.state.newbooks.isbn)
                        };
    const method = "POST";
    const body = JSON.stringify(newbookdata);
    const headers = {
                      'Content-Type': 'application/json'
                    };

    return fetch('http://localhost:3001/books', {method, headers, body})
                    .then((res) => res.Json())
                    .then((resjson) => {
                    })
                    .catch((error) => {
                      console.error()
                    });
  }

  badprintmessage() {
    return (
      <div className="unable_toload">
        <p>unable to load...</p>
      </div>
    );
  }

  render_List = () => {
    return (
      <div className="bookList">
        <this.printTable />
        <this.newbookregister />
      </div>
    );
  }

  render_Submit = () => {
    return (
      <div className="booksubmit">
        <this.submitbookform />
      </div>
    );
  }

  render() {
    if(this.state.loading) {
      return(
        <HashRouter>
          <div>
            <ul>
              <li><Link to='/'>一覧</Link></li>
              <li><Link to='/submit'>登録</Link></li>
            </ul>
            <Switch>
              <Route exact path='/' component={this.render_List} />
              <Route path='/submit' component={this.render_Submit} />
            </Switch>
          </div>
        </HashRouter>
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
