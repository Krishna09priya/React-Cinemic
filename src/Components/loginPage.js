import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/Style Sheets/LoginPage.css';
import logo from '../Assets/Image/logo-transparent-png.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postLogin, resetMsg } from './redux/loginRedux';
import Notifications from '../utils/notifications';

const Login = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const {isLoading, logInSuccessMessage, logInErrorMessage} = useSelector((states)=> states.loginReducer);
  const [loginCredential, setLoginCredential]= useState({
    email: '',
    password: '',
  });;

  const submit = ()=>{
    dispatch(postLogin({
      email:loginCredential.email,
      password:loginCredential.password
    }))
  }
  useEffect(()=>{
    if(logInSuccessMessage){ navigate('/movie-listing-page')
      Notifications(logInSuccessMessage,'success')}
    if(logInErrorMessage){
      dispatch(resetMsg())
    }
  },[logInSuccessMessage,logInErrorMessage])
  return (
    <div className="loginPage-body">
      <nav className="navbar loginPage-navbar-dark" style={{ height: 50 }}>
        <NavLink className="navbar-brand mr-auto" to="#">
          <img src={logo} alt="logo" style={{ height: 40 }} />
        </NavLink>
      </nav>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="loginPage-login-container">
              <h3 style={{ color: '#fff' }}>Login</h3>

              {/* <form action="/login" method="POST"> */}
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div
                          className="input-group-text"
                          style={{
                            height: 38,
                            borderRadius: 0,
                            backgroundColor: '#adad85',
                          }}
                        >
                          <FaEnvelope />
                        </div>
                      </div>
                      <input
                        type="email"
                        className=" form-control loginPage-form-control"
                        placeholder="Email"
                        name="email"
                        id="email"
                        onChange={(e) => setLoginCredential({ ...loginCredential, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div
                          className="input-group-text"
                          style={{
                            height: 38,
                            borderRadius: 0,
                            backgroundColor: '#adad85',
                          }}
                        >
                          <FaLock />
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control loginPage-form-control"
                        placeholder="Password"
                        name="password"
                        id="password"
                        onChange={(e) => setLoginCredential({ ...loginCredential, password: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button type="submit" className="btn loginPage-btn-custom" onClick={submit}>
                      Login
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="loginPage-links-container">
                      <Link
                        to="/signup"
                        style={{ textDecoration: 'none', color: '#fff' }}
                      >
                        New user?
                      </Link>
                      <Link
                        to="/forgotPassword"
                        style={{ textDecoration: 'none', color: '#fff' }}
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
