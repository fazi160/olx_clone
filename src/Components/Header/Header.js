import React, { useContext , useEffect} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import  FirebaseContext,{ AuthContext } from '../../store/FirebaseContext';
import { getAuth, signOut , onAuthStateChanged} from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const {user,setUser} = useContext(AuthContext)
  const {app} =useContext(FirebaseContext)
  const navigate=useNavigate()
 const auth = getAuth(app);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [user]);
  
  

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {/* <span>{user?user.displayName:"Login"}</span> */}
          {user ? (
            <span>{`Welcome ${user?.displayName}`}</span>
          ) : (
            <span onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>Login</span>
          )}
          <hr />
        </div>
        {
          user && <span
            onClick={() => {
              signOut(auth)
              navigate('/login')
            }} style={{ cursor: 'pointer' }}
          >Logout</span>
        }
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span><Link to="create" style={{color:"black"}}>SELL</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;