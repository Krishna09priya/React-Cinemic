import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Style Sheets/ResetPassword.css";
import { FaUserLock, FaLock } from "react-icons/fa";

function ResetPassword() {
  return (
    <div className="resetPassword-body">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="resetPassword-login-container">
              <h3>Reset Password</h3>
              <FaUserLock className="resetPassword-fa-user-lock" />
              <form action="" method="">
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
                        name="newPassword"
                        id="newPassword"
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
                        name="confirmNewPassword"
                        id="confirmNewPassword"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <button
                      type="submit"
                      className="resetPassword-btn-custom"
                      style={{ width: "100%" }}
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
