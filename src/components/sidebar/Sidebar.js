import axios from "axios";
import Categories from "../categories/Categories";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">About Me</div>
      <div className="sidebar-img">
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
      </div>
      <div className="sidebar-desc">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque nihil
        facere, temporibus dolorum tempore,
      </div>
      <Categories />
      <div className="follow">
        <div className="follow-title">Follow Us</div>
        <div className="follow-icon">
          <i className="top-left-icon fab fa-facebook-square"></i>
          <i className="top-left-icon fab fa-twitter-square"></i>
          <i className="top-left-icon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
