import { useContext } from 'react';
import { useLoggedInUser } from '../utils.js';
import UserContext from '../userContext.js';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { storeState } from '../store/store.constants.js';
import { useEffect, useState } from "react";
import { loginUser, signupUser } from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === '/login' ? true : false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserExist, setUserExist] = useState(false);
  const [isEmailUsed, setIsEmailUsed] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { data } = useLoggedInUser('http://localhost:3001/api/v1/dashboard');
  let {
    dispatch,
    setPersist,
    persist,
    userDetails,
  } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  useEffect(() => {
    if(data?.token || userDetails?.token) {
      navigate('/dashboard');
    }
  }, [data, userDetails, navigate])

  const autoLogoutUser = () => {
    const cookieData = document.cookie?.indexOf('=');
    const sessionID = document.cookie?.slice(cookieData + 1);
    if(!sessionID) {
      userDetails = {};
      dispatch({ type: storeState.REMOVE_SAVE_USER_DETAILS, payload: {} });
      navigate('/');
    }
  }
  const navigateToDashBoard = (details) => {
    userDetails = details;
    dispatch({ type: storeState.SAVE_USER_DETAILS, payload: { ...details } });
    navigate('/dashboard');
  }

  const validation = (fieldName, value) => {
    switch (fieldName) {
      case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case 'password':
        return value.length >= 6;
      default:
        break;
    }
  };

  const ctaClickHandler = (e) => {
    e.preventDefault();

    if (!validation('email', email) || !validation('password', password)) {
      setEmailValid(validation('email', email));
      setPasswordValid(validation('password', password));
      return;
    }
    const userPayload = {
      email: email,
      password: password
    };
    if (page) {
      // Send a POST request
      loginUser(userPayload)
      .then((res) => {
        if (res.status === 200 && res.data?.token) {
          navigateToDashBoard(res.data);
          setTimeout(() => {
            autoLogoutUser();
          }, 60 * 60 * 1000); // add time for token expiry so that user will logged out automatically
        }
      }).catch((e) => {
        console.log('Error in login in user', e);
      });
    }
    else{
      signupUser(userPayload)
      .then((res) => {
        if (res.status === 200 && res.data?.token) {
          navigateToDashBoard(res.data);
        }
      }).catch((e) => {
        setIsEmailUsed(true);
      })
    }
  };

  useEffect(() => {
    setUserExist(false);
    setIsEmailUsed(false);
  }, [location]);
  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page ? 'Sign In' : 'Register'}</h1>
        <br />
        <form>
          <input
            className="form-control"
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder="Email" />
          {!emailValid && <p className="text-danger">Email is invalid/blank</p>}
          <input
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password" />
          {!passwordValid && <p className="text-danger">Password is invalid/blank</p>}
          <button className="btn btn-danger btn-block" onClick={ctaClickHandler}>
            {page ? 'Sign In' : 'Register'}
          </button>
          <br />
          {
            page && <div className="form-check">
              <input onChange={(e) => setPersist(e.target.checked)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label text-white" htmlFor="flexCheckDefault">
                Remember Me
              </label>
            </div>
          }
        </form>
        <br />
        <br />
        {isUserExist && <p className="text-danger">User does not exist | Go for Signup</p>}
        {isEmailUsed && <p className="text-danger">Email already in use | Go for Sign In</p>}
        <div className="login-form-other">
          <div className="login-signup-now">
            {page ? 'New to Netflix?' : 'Existing User'} &nbsp;
            <Link className=" " to={page ? '/register' : '/login'}>
              {page ? 'Sign up now' : 'Sign In'}
            </Link>.
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="" />
    </div>
  )
}

export default Login;