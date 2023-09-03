import React, { useEffect,useContext } from 'react';
import './App.css';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ViewPost from './Pages/ViewPost'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Create from './Pages/Create'
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import FirebaseContext, { AuthContext } from './store/FirebaseContext';
import Post from './store/postContext';


function App() {
  const {setUser} =useContext(AuthContext)
  const {app} = useContext(FirebaseContext)
  useEffect(()=>{
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
         setUser(user)
    }
  })
});
  return (
    <div>
      <Post>
       <Router>
          <Routes>
            
              <Route path='/' exact element={<Home/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/create' element={<Create/>}/>
              <Route path='/view' element={<ViewPost/>}/>
          </Routes>
          
       </Router>
       </Post>
    </div>
  );
}

export default App;