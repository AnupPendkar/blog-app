import axios from "axios";
import { useState, useContext } from "react";
import "./create.css";
import { Context } from "../../context/Context";

const Create = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = axios.post("/posts", newPost);
      window.location.replace("/");
    } catch (err) {}
  };

  return (
    <>
      <div className="create">
        <div className="createImgDiv">
          {file && (
            <img className="createImg" src={URL.createObjectURL(file)} alt="" />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="add-title">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Add a title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="publishBtn" type="submit">
              Publish
            </button>
          </div>
          <div className="createDesc">
            <textarea
              placeholder="Tell your story"
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
