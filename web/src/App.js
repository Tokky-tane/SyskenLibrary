import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Signin.js';
import List from './components/List.js';
import Register from './components/Register.js';
import Detail from './components/Detail.js';
import Header from './components/Header.js';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      token: '',
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
  }

  componentDidMount() {
    return fetch('http://localhost:3001/books')
      .then(() => {
        this.setState({
          loading: true,
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

  handleTokenChange(newtoken) {
    this.setState({token: newtoken.token});
    sessionStorage.setItem('token', newtoken.token);
  }

  render_Home = () => {
    return(
      <div className="siteHome">
        <Home />
      </div>
    );
  }

  render_Login = () => {
    return(
      <div className="Loginform">
        <Login settoken={this.handleTokenChange}/>
      </div>
    );
  }

  render_List = () => {
    return (
      <div className="bookList">
        <List />
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
        <Detail />
      </div>
    );
  }


  render() {
    if(this.state.loading) {
      return(
        <MuiThemeProvider>
          <HashRouter>
            <div>
              <Header />
                <Switch>
                  <Route exact path='/' component={this.render_Home} />
                  <Route path='/Login' component={this.render_Login} />
                  <Route path='/List' component={this.render_List} />
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
