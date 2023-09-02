import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Signup from './Pages/Signup'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/signup' exact element={<Signup/>}/>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/create' exact element={<Create/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;

