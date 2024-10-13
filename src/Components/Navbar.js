import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../Assets/Style Sheets/Navbar.css";
import {Dropdown} from 'react-bootstrap';
import logo from "../Assets/Image/logo-transparent-png.png";
import { NavLink,useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
  navigate('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg main-navbar-dark">
      <NavLink className="navbar-brand" to="#">
        <img src={logo} alt="Logo" style={{ height: 40 }} />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse" // Use data-bs-toggle for Bootstrap 5
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto"> {/* Use me-auto for alignment */}
          <li className="nav-item">
            <NavLink className="nav-link main-nav-link main-nav-item" to="/movie-listing-page">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link main-nav-link main-nav-item" to="/plan-listing-page">
              Subscription Plans
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="nav-link dropdown-toggle main-btn">
                <FaUser /> My Account
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/watchlater">Watch Later</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/plan-status-page">Subscription Status</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/watch-history">Watch History</Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/changePassword">Change Password</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
