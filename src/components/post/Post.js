import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-img">
          {post.photo ? (
            <img src={PF + post.photo} alt="" />
          ) : (
            <img
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          )}
        </div>
        <div className="post-info">
          <div className="span-titles">
            {post.categories.map((c) => (
              <span className="music-span">{c.name}</span>
            ))}
          </div>

          <Link className="link" to={`/post/${post._id}`}>
            <div className="post-title">{post.title}</div>
          </Link>
          <div className="timestamp">
            {new Date(post.createdAt).toDateString()}
          </div>
          <Link className="link" to={`/post/${post._id}`}>
            <div className="post-desc">{post.desc}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
