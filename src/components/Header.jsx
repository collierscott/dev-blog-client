import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Header = ({isAuthenticated, userData, logout}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink exact to="/" className="navbar-brand">Home</NavLink>

      <ul className="navbar-nav ml-auto">
        {
          !isAuthenticated &&
          (
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          )
        }
        {
          isAuthenticated &&
          (
            <li className="nav-item">
              <Link to="/blog-post-form" className="nav-link">
                Add New
              </Link>
            </li>
          )
        }
      </ul>

      <span className="navbar-text">
          {isAuthenticated ?
            null === userData ?
              <i className="fas fa-spinner fa-spin"/>
              :
              <div>
                <span>Hello {userData.name}</span>
                <a className="btn" onClick={logout}>Logout</a>
              </div>
            :
            <NavLink exact to="/login">Sign in</NavLink>
          }
      </span>
    </nav>
  )
};

export default Header;
