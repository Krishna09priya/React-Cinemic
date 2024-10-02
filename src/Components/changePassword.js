import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/ChangePassword.css";
import { FaUserLock, FaLock } from "react-icons/fa";
import NavbarComponent from "./Navbar";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState } from "react";
import {postChangePassword,resetMsg} from "./redux/changePasswordRedux";
import Notifications from "../utils/notifications";

function ChangePassword() {
  const dispatch = useDispatch();

  const { changePasswordSuccessMessage } = useSelector((state) => state?.changePasswordReducer);
  const [changePasswordCredential, setChangePasswordCredential]= useState({
    currentPassword: '',
    newPassword:'',
    confirmNewPassword:''
  });;
  const [errorMessage, setErrorMessage] = useState('');

  const submit = ()=>{
    if (changePasswordCredential.newPassword !== changePasswordCredential.confirmNewPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    // If passwords match, dispatch the signup action
    setErrorMessage("");
    dispatch(postChangePassword({currentPassword:changePasswordCredential.currentPassword,newPassword:changePasswordCredential.newPassword}));
    setChangePasswordCredential({
      currentPassword: '',
      newPassword:'',
      confirmNewPassword:''
    })
  }
  useEffect(()=>{
    if(changePasswordSuccessMessage){ 
      Notifications(changePasswordSuccessMessage,'success')
    }
      dispatch(resetMsg())
  },[changePasswordSuccessMessage,dispatch])


  return (
    <div className="changePassword-body">
        <NavbarComponent/>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="changePassword-login-container">
              <h3>Change Password</h3>
              <FaUserLock className="changePassword-fa-user-lock" />
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
                        className=" form-control changePassword-form-control"
                        placeholder="Current Password"
                        name="currentPassword"
                        id="currentPassword"
                        value={changePasswordCredential.currentPassword}
                        onChange={(e)=>setChangePasswordCredential({...changePasswordCredential,currentPassword:e.target.value})}
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
                        className=" form-control changePassword-form-control"
                        placeholder="New Password"
                        name="newPassword"
                        id="newPassword"
                        value={changePasswordCredential.newPassword}
                        onChange={(e)=>setChangePasswordCredential({...changePasswordCredential,newPassword:e.target.value})}
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
                        className="form-control changePassword-form-control"
                        placeholder="Confirm New Password"
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                        value={changePasswordCredential.confirmNewPassword}
                        onChange={(e)=>setChangePasswordCredential({...changePasswordCredential,confirmNewPassword:e.target.value})}
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
                      className="changePassword-btn-custom"
                      style={{ width: "100%" }}
                      onClick={submit}
                    >
                      Submit
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

export default ChangePassword;
