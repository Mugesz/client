import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
      };
  return (
    <nav className="navbar navbar-expand-lg nav-bg fixed-top text-light">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <h1>logo</h1>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item ">
              <NavLink
                className="nav-link text-light"
                to="/dashboard"
                activeClassName="active"
                exact
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-light"
                to="/adduser"
                activeClassName="active"
              >
                AddUser
              </NavLink>
            </li>
          </ul>
        </div>
        <button className="btn btn-danger" onClick={handleLogout}>
            logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
