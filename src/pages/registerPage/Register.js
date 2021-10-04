import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register-title">Sign Up</div>
        <form className="register-form" onSubmit={handleSubmit}>
          <label className="email-label">Username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <label className="email-label">Email</label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
          <label className="email-label">Password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
          <button className="register-btn" type="submit">
            Sign Up
          </button>
        </form>
        <button className="registerLogin-btn">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        <span>{error && "Something Gone Wrong!!"}</span>
      </div>
    </>
  );
};

export default Register;
