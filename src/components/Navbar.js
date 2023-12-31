import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("idtkn");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            noteGemini
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>

            {!sessionStorage.getItem("idtkn") ? (
              <>
                <Link className="btn btn-primary me-3" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
