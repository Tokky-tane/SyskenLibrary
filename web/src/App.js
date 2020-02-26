import React from 'react';
import {HashRouter, Route, Switch, Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, MenuItem, Drawer} from 'material-ui';
import './App.css';
import List from './components/List.js';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      books: [],
      booknumber: 0,
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

  newbookregister() {
    return (
      <div className="bookregister">
        <button className="registarbutton">新しい本を登録</button>
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
      default :
        break;
    }

    this.setState({newbooks: book});
  }

  postnewbook = () => {
    const newbookdata = { title: (this.state.newbooks.title),
                          author: (this.state.newbooks.author),
                          isbn: (this.state.newbooks.isbn) || null ,
                        };
    const method = "POST";
    const mode = "cors";
    const body = JSON.stringify(newbookdata);
    const headers = {
                      'Content-Type': 'application/json'
                    };

    return fetch('http://localhost:3001/books', {method, headers, body, mode})
                    .then(() => {})
                    .catch((error) => {
                      alert("本の登録に失敗しました...\n" + error);
                      console.log(error);
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
        <List books={this.state.books} />
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
        <MuiThemeProvider>
          <HashRouter>
            <div>
              <AppBar title="Sysken Library" />
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
        </MuiThemeProvider>
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
