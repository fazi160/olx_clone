import React, { useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../../store/FirebaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';

function Login  () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {app} = useContext(FirebaseContext)
  const handleLogin=(e)=>{
    e.preventDefault()
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        
      </div>
      <Link to='/signup'>Signup</Link>  
    </div>
    
  );
}

export default Login;
