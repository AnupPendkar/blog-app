import axios from "axios";
import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./setting.css";

const Setting = () => {
  const { user, dispatch, state } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleDelete = async (req, res) => {
    try {
      await axios.delete("/users/" + user._id, {
        userId: user._id,
        username: user.username,
      });
      console.log(user._id);
      // res.status(200).json(user.username);
      window.location.replace("/");
    } catch (err) {
      // res.status(500).json(err);
    }
  };

  return (
    <div className="setting">
      <div className="settingSec">
        <div className="settingTop">
          <span className="settingUpdate">Update Your Account</span>
          <span className="settingDelete" onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <div className="profilePicSec">
            <span>Profile Picture</span>
            <div className="profileRow">
              <label htmlFor="fileInput">
                <img
                  className="settingImg"
                  src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                  alt=""
                />
              </label>
              <label htmlFor="fileInput" className="IconDot">
                <i class="far fa-user"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <label className="settingUsername">Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="settingEmail">Email</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="settingPassword">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingBtn" type="submit">
            Update
          </button>
        </form>
      </div>
      <div className="settingSidebar">
        <Sidebar />
      </div>
    </div>
  );
};

export default Setting;
