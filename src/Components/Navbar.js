import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/Navbar.css";
import Dropdown from 'react-bootstrap/Dropdown';
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
    <nav className="navbar navbar-expand-sm main-navbar-dark" style={{ height: 50 }}>
      <NavLink className="navbar-brand" to="#">
        <img
          src={logo}
          alt="Logo"
          style={{ height: 40 }}
        />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
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
        <ul className="navbar-nav main-left">
          <li className="nav-item">
          <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="main-btn">
        <FaUser/> My Account
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/watchlater">Watch Later</Dropdown.Item>
        <Dropdown.Item href="/plan-status-page">Subscription Status</Dropdown.Item>
        <Dropdown.Item href="/watch-history">Watch History</Dropdown.Item>
        <Dropdown.Item href="/changePassword">Change Password</Dropdown.Item>
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
