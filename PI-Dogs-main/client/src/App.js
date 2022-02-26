import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
      
       <Routes>
          <Route exact path= '/' element={<LandingPage/>}/>
          <Route path= '/home' element={<Home/>}/>
          <Route path= '/dog' element={<DogCreate/>}/>

       </Routes>
      

      </div>
    </Router>
  );
}

export default App;
