import React from 'react';
import {HashRouter, Route, Switch, Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar} from 'material-ui';
import './App.css';
import List from './components/List.js';
import Register from './components/Register.js';
import Detail from './components/Detail.js';

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
      </div>
    );
  }

  render_Submit = () => {
    return (
      <div className="booksubmit">
        <Register />
      </div>
    );
  }

  render_Detail = () => {
    return (
      <div className="bookdetail">
        <Detail books={this.state.books}/>
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
                <Route path='/detail' component={this.render_Detail} />
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
