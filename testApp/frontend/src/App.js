// import libraries
import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';

// Import other components
import NavBar from './components/NavBar';
import Complaints from './components/Complaints';
import Login from './components/Login';
import Home from './components/Home';


function App() {

  return (
    <div className="App">
      {/* NavBar */}
      <NavBar/>

      {/* TESTING GET */}
      {/* <p>Below should be the response for "/admin/"</p> */}
      {/* <div>{post}</div> */}

      {/* ROUTES */}
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/complaints' element={<Complaints/>}></Route>
      </Routes>
      

      {/* Testing complaints */}
      {/* <Login/> */}
      
      {/* <Complaints/> */}
      

    </div>
  );
}

export default App;
