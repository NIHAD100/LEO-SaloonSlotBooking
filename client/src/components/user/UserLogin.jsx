import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Google from "../../assets/Google.png";
import SignImage from "./SignImageSection";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/features/userSlice";
//service
import { signin } from "../../redux/thunk/user";
import { googleSignin } from "../../context/UserAuth";

function UserLogin() {

  const { setAuth } = useAuth();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const mobileRef = useRef();

  const [mobile, setMobile] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [passwordHide, hideChange] = useState(false);

  useEffect(() => {
    mobileRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [mobile, pwd]);

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    dispatch(signin({ mobile, password: pwd }));

  };

  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      const hello = await googleSignin();
      let { data } = await axios.post('/signin/google', hello._tokenResponse)
      localStorage.setItem('user', data.accessToken);
      dispatch(userLogin())
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setErrMsg(error.message);
    }
  };

  return (
    <>
      {user?.isLoggedIn && <Navigate to="/" replace />}
      <div className="pb-0 sm:pb-32 h-screen">
        <div className="w-screen sm:container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <SignImage />
            <div className="py-8 sm:pt-40">
              <div className="rounded-lg shadow-xl w-96 h-auto">
                <div className="px-10 sm:px-4">
                  <h1 className="text-4xl select-none font-semibold font-roboto ">Sign in</h1>
                  <p className="text-md py-2 font-sans">Keep styling stay healthy</p>
                  <p className={user?.signin?.errMsg ? "errMsg bg-red-600 p-1 text-white  " : "hidden  "}>
                    {user?.signin?.errMsg}
                  </p>
                  <form onSubmit={handleSigninSubmit}>
                    <div>
                      <input
                        type="number"
                        id="mobile"
                        ref={mobileRef}
                        className="border my-3 border-gray-300 text-gray-900 text-md rounded-md  w-full p-3 ring-green-300 ring-offset-1 focus:ring "
                        placeholder="Mobile"
                        autoComplete="off"
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                      <div className="flex items-center">
                        <input
                          type={passwordHide ? "text" : "password"}
                          id="password"
                          className="border my-3 border-gray-300 text-gray-900 text-md rounded-md  w-full p-3 ring-green-300 ring-offset-1 focus:ring "
                          placeholder="Password"
                          required
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                        />
                        <p className="text-green-700 -ml-12 cursor-pointer select-none" onClick={() => hideChange(!passwordHide)}>
                          {passwordHide ? `hide` : `show`}
                        </p>
                      </div>
                    </div>
                    <p onClick={() => navigate("/forgotPwd")} className="font-semibold cursor-pointer text-emerald-600 font-roboto">
                      Forgot password?
                    </p>
                    <button type="submit" className="w-full select-none p-4 bg-emerald-700 rounded-full text-white text-xl font-roboto mt-5 font-semibold hover:bg-emerald-800">
                      Sign in
                    </button>
                  </form>
                  <div className="flex items-center my-4">
                    <hr className="w-1/2 " />
                    <p className="mx-3">or</p>
                    <hr className="w-1/2" />
                  </div>
                  <div>
                    <button
                      onClick={handleGoogleSignin}
                      className="border-2 select-none bg-white border-slate-300 text-slate-500 hover:bg-[#edf3f2]  rounded-full pl-12 w-full text-xl font-roboto font-semibold  p-3"
                    >
                      Sign in with Google
                    </button>
                    <img src={Google} className="h-6 ml-10 sm:ml-16 -mt-10 select-none" alt="" />
                  </div>
                </div>
                <div className="place-content-center">
                  <p className="px-16 py-10">
                    Don't have an account?
                    <Link to="/signup" className="text-green-800 hover:text-green-900 hover:underline cursor-pointer">
                      {" "}
                      Signup
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
