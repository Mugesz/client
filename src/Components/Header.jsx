import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email"); // Remove email from local storage on logout
    navigate("/");
  };

  // Retrieve email from local storage
  const email = localStorage.getItem("mail");

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <Link className="btn" to="/dashboard">
            <h1 className="navbar-brand">All Users</h1>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          {email && <p className="text-light me-4">Logged in as: {email}</p>}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
