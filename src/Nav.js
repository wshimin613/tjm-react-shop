import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const navStyle = {
    color: 'white'
};

const navStyleRight = {
    color: 'white',
    position: 'absolute',
    right: '0px',
}

function Nav(props) {
    const isAuthenticated = JSON.parse(localStorage.getItem('user-info'))
    const logOut = () => {
        localStorage.clear();
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">
                            {
                                isAuthenticated ?
                                    <>
                                        <Link to="/" className="nav-links" style={navStyle}>Home</Link>
                                        <Link to="/shop" className="nav-links" style={navStyle}>shop</Link>
                                        <Link to="/weather" className="nav-links" style={navStyle}>weather</Link>
                                        <Link to="/" className="nav-links" style={navStyleRight} onClick={logOut}>Logout-{isAuthenticated.name}</Link>
                                    </>
                                    :
                                    <>
                                        <Link to="/" className="nav-links" style={navStyle}>Home</Link>
                                        <Link to="/shop" className="nav-links" style={navStyle}>shop</Link>
                                        <Link to="/register" className="nav-links" style={navStyle}>register</Link>
                                        <Link to="/login" className="nav-links" style={navStyle}>login</Link>
                                    </>
                            }
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </React.Fragment>
    );
}

export default Nav;