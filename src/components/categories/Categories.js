import "./categories.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);

  const id = 1;

  return (
    <div className="categories">
      <div className="categories-title">Categories</div>
      <ul className="categories-list">
        {cats.map((c) => (
          <Link to={`/?cat=${c.name}`} className="link">
            <li className="categories-item" key={c.id}>
              {c.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
