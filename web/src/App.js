import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core';
import './App.css';
import Home from './components/Home.js';
import Login from './components/Signin.js';
import List from './components/List.js';
import Register from './components/Register.js';
import Detail from './components/Detail.js';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      books: [],
      token: '',
    };

    this.handleTokenChange = this.handleTokenChange.bind(this);
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
        <List books={this.state.books} />
      </div>
    );
  }

  render_Submit = () => {
    return (
      <div className="booksubmit">
        <Register token={this.state.token}/>
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

  render_Header = () => {
    const useStyles = makeStyles(theme => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }));
    const classes = useStyles();
    const [auth, setauth] = React.useState(sessionStorage.getItem('token') !== '');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
      setAnchorEl(null);
    }
    const handleJumpMypage = () => {
      alert('まだ未実装');
      setAnchorEl(null);
    }

    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography 
              variant='h6'
              className={classes.title}
            >
              Sysken Library
            </Typography>
            {auth && (
              <div>
                <IconButton
                  className={classes.menuButton}
                  aria-label='account'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleJumpMypage}>マイページ</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  render() {
    if(this.state.loading) {
      return(
        <MuiThemeProvider>
          <HashRouter>
            <div>
              <this.render_Header />
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
