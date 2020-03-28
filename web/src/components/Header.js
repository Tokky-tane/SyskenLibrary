import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core';

class Header extends React.Component {
    render_Header() {
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
        return(
            <>
                <this.render_Header />
            </>
        );
    }
}

export default Header;