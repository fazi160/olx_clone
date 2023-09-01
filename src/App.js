import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import Signup from './Pages/Signup'
import Home from './Pages/Home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/signup' exact element={<Signup/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

