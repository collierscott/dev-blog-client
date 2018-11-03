import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = ({isAuthenticated, userData}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink exact to="/" className="navbar-brand">Home</NavLink>
        <span className="navbar-text">
            {isAuthenticated ?
              null === userData ?
                <i className="fas fa-spinner fa-spin"/>
                :
              <span>Hello {userData.name}</span> :
              <NavLink exact to="/login">Sign in</NavLink>
            }
        </span>
    </nav>
  )
};

export default Header;
