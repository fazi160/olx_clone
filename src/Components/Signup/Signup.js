import React, { useState, useContext } from "react";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import FirebaseContext from "../../store/FirebaseContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const { db,app } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      updateProfile(result.user, {
        displayName: username,
      })
      
      .then(() => {
        setDoc(doc(db, "users", result.user.displayName), {
          id: result.user.uid,
          username: username,
          phone: phone,
        })
        
        .then(() => {
          navigate("/login");
        });
      });
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            id="fname"
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            id="fname"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            id="lname"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            id="lname"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}