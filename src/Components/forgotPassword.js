import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/ForgotPassword.css"
import { Link } from "react-router-dom";
import { FaCaretLeft, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postForgotPassword, resetMsg } from './redux/forgotPasswordRedux';
import Notifications from '../utils/notifications';

function ForgotPassword() {
  const dispatch = useDispatch();
  const {isLoading, forgotPasswordSuccessMessage} = useSelector((states)=> states?.forgotPasswordReducer);
  const [email, setEmail]= useState('');;

  const submit = ()=>{
    dispatch(postForgotPassword(email));
    setEmail('');
  }
  useEffect(()=>{
    if(forgotPasswordSuccessMessage){ 
      Notifications(forgotPasswordSuccessMessage,'success')
    }
      dispatch(resetMsg());
  },[forgotPasswordSuccessMessage])

  return (
    <div className="forgotPassword-body">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="forgotPassword-login-container">
              <h3 style={{ textAlign: "center" }}>Forgot Password</h3>
              <p>
                Enter your email &amp; we'll send you a link to reset your password
              </p>
              {/* <form action="" method=""> */}
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div
                          className="input-group-text"
                          style={{ height: 38, borderRadius: 0, backgroundColor: '#adad85' }}
                        >
                          <FaEnvelope />
                        </div>
                      </div>
                      <input
                        type="email"
                        className=" form-control forgotPassword-form-control"
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e)=>setEmail({...email, email:e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button type="submit" className="forgotPassword-btn-custom" onClick={submit}
                    disabled={isLoading}  // Disable the button when loading
                    >
                      {isLoading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status">
                        </div>
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </div>
                <p style={{ textAlign: "center" }}>
                  <FaCaretLeft/>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Back to login
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

export default ForgotPassword;
