import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import Sidebar from "../../components/sidebar/Sidebar";
import "./about.css";
import axios from "axios";
import { Context } from "../../context/Context";

const About = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title: title,
        desc: desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="about">
      <div className="aboutSec">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="aboutImg" />
        )}
        {updateMode ? (
          <div className="aboutTitle">
            <input
              type="text"
              value={title}
              className="aboutTitleInput"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        ) : (
          <div className="aboutTitle">
            <span className="aboutSpan">{title}</span>
            {post.username === user.username && (
              <div className="aboutIcon">
                <i class="fas fa-edit" onClick={() => setUpdateMode(true)}></i>
                <i class="far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </div>
        )}
        <div className="aboutAuthor">
          <span>
            author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="aboutTime">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <div className="descSec">
          {updateMode ? (
            <>
              <textarea
                className="aboutDescInput"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
              <button className="aboutUpdateButton" onClick={handleUpdate}>
                Update
              </button>
            </>
          ) : (
            <div className="aboutDesc">{desc}</div>
          )}
        </div>
      </div>
      <div className="aboutSidebar">
        <Sidebar />
      </div>
    </div>
  );
};

export default About;
