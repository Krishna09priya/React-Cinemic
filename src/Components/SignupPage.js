import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/LoginPage.css";
import logo from "../Assets/Image/logo-transparent-png.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postSignup, resetMsg } from './redux/signupRedux';
import Notifications from '../utils/notifications';


function SignupPage() {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const {signupSuccessMessage, signupErrorMessage} = useSelector((states)=> states.signupReducer);
  const [signupCredential, setSignupCredential]= useState({
    username:'',
    email: '',
    password: '',
  });;
  const [errorMessage, setErrorMessage] = useState('');

  const submit = ()=>{
    if (signupCredential.password !== signupCredential.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    // If passwords match, dispatch the signup action
    setErrorMessage("");
    dispatch(postSignup({
      username:signupCredential.username,
      email:signupCredential.email,
      password:signupCredential.password
    }))
  }
  useEffect(()=>{
    if(signupSuccessMessage){ navigate('/login')
      Notifications(signupSuccessMessage,'success')}
    if(signupErrorMessage){
      dispatch(resetMsg())
    }
  },[signupSuccessMessage,signupErrorMessage])

  return (
    <div className="loginPage-body">
  <nav className="navbar loginPage-navbar-dark" style={{ height: 50 }}>
    <NavLink className="navbar-brand mr-auto" to="#">
      <img
        src={logo}
        alt="logo"
        style={{ height: 40 }}
      />
    </NavLink>
  </nav>
  <div className="container-fluid">
    <div className="row justify-content-center">
      <div className="col-sm-6 col-md-6 col-lg-4">
        <div className="loginPage-login-container">
          <h3 style={{ color: "#fff" }}>Signup</h3>
          {/* <form action="" method=""> */}
          <div className="row mb-4">
                 <div className="col-sm-12">
                 <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38, borderRadius:0,backgroundColor:'#adad85'}}>
                    <FaUser/>
                    </div>
                  </div>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    id="username"
                    name="username"
                    onChange={(e) => setSignupCredential({ ...signupCredential, username: e.target.value })}
                   />
                 </div>
                </div> 
                </div>
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38, borderRadius:0,backgroundColor:'#adad85'}}>
                    <FaEnvelope/>
                    </div>
                  </div>
                  <input
                    type="email"
                    className=" form-control loginPage-form-control"
                    placeholder="email"
                    name="email"
                    id="email"
                    onChange={(e) => setSignupCredential({ ...signupCredential, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38, borderRadius:0,backgroundColor:'#adad85'}}>
                    <FaLock/>
                    </div>
                  </div>
                  <input
                    type="password"
                    className="form-control loginPage-form-control"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={(e) => setSignupCredential({ ...signupCredential, password: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-12">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text" style={{height:38, borderRadius:0,backgroundColor:'#adad85'}}>
                    <FaLock/>
                    </div>
                  </div>
                  <input
                    type="password"
                    className="form-control loginPage-form-control"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) => setSignupCredential({ ...signupCredential, confirmPassword: e.target.value })}
                  />
                  {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button type="submit" className="btn loginPage-btn-custom" onClick={submit}>
                  Signup
                </button>
              </div>
            </div>
            <p style={{ textAlign: "center", paddingTop: 5 }}>
                  <Link to="/login" style={{ textDecoration: "none", color: "#ffffff" }}>
                    Already have an account?
                  </Link>
                </p>
          {/* </form> */}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default SignupPage;
