import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./navbar.css";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      {/* icon */}
      <div className="top-left">
        <i className="top-left-icon fab fa-facebook-square"></i>
        <i className="top-left-icon fab fa-twitter-square"></i>
        <i className="top-left-icon fab fa-instagram-square"></i>
      </div>
      {/* menu */}
      <div className="top-center">
        <ul className="top-list">
          <li className="top-list-item">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="top-list-item">ABOUT</li>
          <li className="top-list-item">CONTACT</li>
          <li className="top-list-item">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="top-list-item" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      {/* profile */}
      <div className="top-right">
        {user ? (
          <>
            <Link to="/settings">
              <img
                className="navbarProfilePic"
                src={PF + user.profilePic}
                alt=""
              />
            </Link>
            <i className="top-right-search-icon fas fa-search"></i>
          </>
        ) : (
          <ul className="top-list">
            <li className="top-list-item">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="top-list-item">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
