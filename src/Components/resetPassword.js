import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/ResetPassword.css";
import { useNavigate,useParams } from "react-router-dom";
import { FaUserLock, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { postResetPassword, resetMsg } from './redux/resetPasswordRedux';
import Notifications from '../utils/notifications';

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { resetPasswordSuccessMessage } = useSelector((state) => state?.resetPasswordReducer);
  const [passwordResetCredential, setPasswordResetCredential]= useState({
    password: '',
    confirmPassword:''
  });;
  const [errorMessage, setErrorMessage] = useState('');

  const submit = ()=>{
    if (passwordResetCredential.password !== passwordResetCredential.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    // If passwords match, dispatch the signup action
    setErrorMessage("");
    dispatch(postResetPassword({password:passwordResetCredential.password,token:token}))
  }
  useEffect(()=>{
    if(resetPasswordSuccessMessage){ 
      Notifications(resetPasswordSuccessMessage,'success')
      navigate('/login')
    }
      dispatch(resetMsg())
  },[resetPasswordSuccessMessage,dispatch])


  return (
    <div className="resetPassword-body">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="resetPassword-login-container">
              <h3>Reset Password</h3>
              <FaUserLock className="resetPassword-fa-user-lock" />
              {/* <form action="" method=""> */}
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div
                          className="input-group-text"
                          style={{ height: 38, borderRadius: 0, backgroundColor: '#adad85' }}
                        >
                          <FaLock />
                        </div>
                      </div>
                      <input
                        type="password"
                        className=" form-control resetPassword-form-control"
                        placeholder="New Password"
                        name="password"
                        id="password"
                        onChange={(e)=>setPasswordResetCredential({...passwordResetCredential,password:e.target.value})}
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
                          style={{ height: 38, borderRadius: 0, backgroundColor: '#adad85' }}
                        >
                          <FaLock />
                        </div>
                      </div>
                      <input
                        type="password"
                        className="form-control resetPassword-form-control"
                        placeholder="Confirm New Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        onChange={(e)=>setPasswordResetCredential({...passwordResetCredential, confirmPassword:e.target.value})}
                      />
                    </div>
                    {errorMessage && (
                <div className="text-danger">
                  {errorMessage}
                </div>
              )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="resetPassword-btn-custom"
                      style={{ width: "100%" }}
                      onClick={submit}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
