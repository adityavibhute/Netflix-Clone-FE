import { useNavigate, Link } from "react-router-dom";
import { useContext } from 'react'
import { storeState } from '../store/store.constants';
import { logoutUser } from '../api/api';
import UserContext from '../userContext';

const Header = () => {
  const navigate = useNavigate();
  const {
    userDetails,
    dispatch,
} = useContext(UserContext);

  const clickHandler = (e) => {
    e.preventDefault();
    const cookieData = document.cookie?.indexOf('=');
    const sessionID = document.cookie?.slice(cookieData + 1);
    if ((sessionID || userDetails?.token) && window.location?.pathname?.includes('dashboard')) {
      logoutUser(userDetails?.token, sessionID)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: storeState.REMOVE_SAVE_USER_DETAILS, payload: {} });
          navigate('/');
        }
      }).catch((e) => {
        console.log('Error in logout ', e);
      });
    } else {
      navigate('/login');
    }
  }

  return(
    <header className="topNav">
      <nav className="navbar navbar-expand-md navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img className="nav__logo" src="https://www.freepnglogos.com/uploads/netflix-logo-0.png" alt="" />
          </Link>
          
          <div className="navbar">
            <form className="d-flex" role="search">
              <select>
                <option>English</option>
                <option>Hindi</option>
              </select>
              <button className="btn btn-danger" onClick={ clickHandler }>{userDetails?.token && window.location?.pathname?.includes('dashboard') ? 'Logout' : 'Signin' }</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;