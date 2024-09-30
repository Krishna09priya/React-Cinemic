import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/LandingPage.css";
import {NavLink } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import Figure from 'react-bootstrap/Figure';
import logo from "../Assets/Image/logo-transparent-png.png";
import image from "../Assets/Image/landing page first.jpg";
import image1 from "../Assets/Image/carousal image 2.jpg";
import image2 from "../Assets/Image/carousal image 1.jpg";
import image3 from "../Assets/Image/carousal 3.jpg";

function LandingPage() {

  return (
    <>
      <div className="body">
      <nav className="navbar navbar-dark" style={{ height: 50 }}>
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink className="navbar-brand" to="#">
        <img
          src={logo}
          alt="logo"
          style={{ height: 40 }}
        />
      </NavLink>
    </li>
  </ul>
  <ul  style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
    <li className="nav-item ml-auto">
      <NavLink to="/login" className="btn-custom" style={{ paddingRight: 1,textDecoration:"none" }}>
        Login
      </NavLink>
      <span className="separator" />
      <NavLink to="/signup" className="btn-custom" style={{ paddingLeft: 1, paddingRight: 34,textDecoration:"none" }}>
        Signup
      </NavLink>
    </li>
  </ul>
</nav>

        <div className="container-fluid content">
          <div className="row h-100">
            {/* Image on the right for larger screens, above content on smaller screens */}
            <div className="col-md-6 order-md-2 d-flex justify-content-center align-items-center">
            <Figure>
      <Figure.Image
        className="right-content"
        alt="171x180"
        src={image}
      />
    </Figure>
            </div>
            <div className="col-md-6 order-md-1 d-flex justify-content-center align-items-center">
              <div className="left-content">
                <div>
                  <h1 style={{ color: "#fff", fontWeight: "bolder" }}>
                    Welcome to Our OTT Platform
                  </h1>
                  <p style={{ color: "#fff", fontWeight: "bold" }}>
                    Explore a vast collection of movies, series, and documentaries,
                    all available at your fingertips. Enjoy seamless streaming with
                    no interruptions and exclusive content curated just for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Carousel>
        <Carousel.Item>
          <img src={image1} alt="First slide" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image2} alt="Second slide" className="d-block w-100" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={image3} alt="Third slide" className="d-block w-100" />
        </Carousel.Item>
      </Carousel>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="logo">
                <img
                  src={logo}
                  alt="Site Logo"
                />
              </div>
              <div className="details">
                <p>© 2024 Your OTT Platform. All rights reserved.</p>
                <p>
                  Stream your favorite movies, series, and documentaries anytime,
                  anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
