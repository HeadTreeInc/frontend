import React, { useState, useEffect, useRef } from "react";
import Logo from "../../logo.png";
import { ToastContainer } from "react-toastify";

const Login = ({ props }) => {
  const refOtp1 = useRef(null);
  const refOtp2 = useRef(null);
  const refOtp3 = useRef(null);
  const refOtp4 = useRef(null);
  const refOtp5 = useRef(null);
  const refOtp6 = useRef(null);

  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [showLoader, setshowLoader] = useState(false);
  const [securePw, toggleSecurePw] = useState(true);
  const [loginWithOtp, toggleLoginWithOtp] = useState(false);
  const [otpSent, toggleOtpSent] = useState(false);
  const [forgotPw, toggleForgotPw] = useState(false)
  const [forgotPwLinkSent, toggleForgotPwLinkSent] = useState(false);

  return (
    <div className="bg-img justify-content d-flex"
    ><ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover />
      <div
        style={{ width: '35rem', height: '35rem', borderRadius: '1rem' }}
        className="bg-white align-self-center py-3 shadow ml-6">
        <div className="text-center py-5">
          <img onClick={() => { window.location = "/" }}
            style={{}}
            className="cursor" src={Logo} alt="logo" height="60px"
          />
        </div>
        <h1 className="font-wt-500 font-size-20 text-center">Login</h1>
        <div className="p-4 justify-content-center d-flex flex-column align-items-center">
          {otpSent ? (
            <>
              <label className="cursor w-90" >Enter OTP</label>
              <div className="form-group mb-4 w-90 d-flex flex-row justify-content-between"
                style={{ height: "3rem" }}
              >
                <input type="text" id="otp1" ref={refOtp1} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp1" value={data.otp1} />
                <input type="text" id="otp2" ref={refOtp2} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp2" value={data.otp2} />
                <input type="text" id="otp3" ref={refOtp3} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp3" value={data.otp3} />
                <input type="text" id="otp4" ref={refOtp4} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp4" value={data.otp4} />
                <input type="text" id="otp5" ref={refOtp5} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp5" value={data.otp5} />
                <input type="text" id="otp6" ref={refOtp6} maxLength={1} className={" form-control w-15 h-100" + (!errors.otp ? '' : ' border-danger')} name="otp6" value={data.otp6} />
              </div>
              {errors.otp && <label className="w-90 text-danger">{errors.otp}</label>}
              <label className="cursor w-90 light-font" >An OTP has been sent on your registered email id</label>
              <label
                className="cursor w-90 mb-4" >Resend OTP</label>
            </>
          ) : (
            <div className="form-group mb-4 w-80">
              <input type="text" className={" form-control" + (!errors.email ? '' : ' border-danger')} placeholder="Enter Email Id" name="email" value={data.email} />
              {errors.email && <p className="text-danger error-contract">{errors.email}</p>}
            </div>
          )}

          {loginWithOtp ? (
            <button type="button"
              className={`new-btn py-2 w-90 text-white mb-2`}>
              {otpSent ? "Login" : "Send OTP"}
            </button>
          ) : (
            <>
              {!forgotPw ? (
                <div className="form-group w-80 position-relative">
                  <i
                    onClick={() => toggleSecurePw(!securePw)}
                    className={`fas ${!securePw ? "fa-eye" : 'fa-eye-slash'} input-icon`} id="togglePassword" ></i>
                  <input type={securePw ? "password" : 'text'} className={" form-control" + (!errors.password ? '' : ' border-danger')} placeholder="Enter Password" name="password" value={data.password} />

                  {errors.password && <p className="text-danger error-contract">{errors.password}</p>}
                </div>
              ) : null}
            </>
          )}

          {forgotPw ? (
            <label className="cursor w-90 light-font" >Password reset request registered (if account associated with given mail exists). Please check your email for further instructions.</label>
          ) : null}

          {/* {!forgotPw ? (
            <label
              onClick={() => { toggleLoginWithOtp(!loginWithOtp); toggleOtpSent(false) }}
              className={`cursor w-90 ${loginWithOtp ? "mb-4" : ""}`}>{loginWithOtp ? 'Log in with password' : "Log in with OTP?"}</label>
          ) : null} */}

          {!loginWithOtp || forgotPw && !forgotPwLinkSent ? (
            <button type="button"
              className={`new-btn py-2 w-45 mb-4 text-white my-4`}>
              {forgotPw ? "Send Reset Link" : "Login"}
            </button>
          ) : (
            null
          )}

          <label className="font-wt-400 font-size-14" >New to Head Tree? <span
            onClick={() => { window.location = 'registration' }}
            className="text-primary cursor">Sign up</span></label>
        </div>
      </div>
    </div >
  )
}

export default Login;