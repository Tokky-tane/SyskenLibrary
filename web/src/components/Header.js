import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AccountCircle from '@material-ui/icons/AccountCircle';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles, useScrollTrigger } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Scrolltop(props) {
    const {children, window} = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#BacktoTop');

        if(anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };

    return (
        <Zoom in={trigger}>
          <div onClick={handleClick} className={classes.root}>
            {children}
          </div>
        </Zoom>
    );
}

Scrolltop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

function BacktoTop(props) {
    return (
        <Scrolltop {...props}>
            <Fab
                color='secondary'
                size='small'
                aria-label='scroll back to top'
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Scrolltop>
    );
}

export default function Header() {
    const classes = useStyles();
    const [auth] = React.useState(sessionStorage.getItem('token') !== '');
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
    const handleJunpSignin = () => {
        window.location.href = '/#/Login'
        setAnchorEl(null);
    }

    return (
    <div >
        <AppBar position='static'>
        <Toolbar id='BacktoTop'>
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
                    <MenuItem onClick={handleJunpSignin}>ログイン</MenuItem>
                </Menu>
            </div>
            )}
        </Toolbar>
        </AppBar>
        <BacktoTop />
    </div>
    );
}
