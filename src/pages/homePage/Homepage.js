import { useState, useEffect } from "react";
import Ads from "../../components/ads/Ads";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";
import { useLocation } from "react-router";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <div className="homeSidebar">
          <Sidebar />
          <Ads />
          <Ads />
          <Ads />
        </div>
      </div>
    </>
  );
};

export default Homepage;
