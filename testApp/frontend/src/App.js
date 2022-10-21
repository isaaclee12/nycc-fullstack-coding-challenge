// import libraries
import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';

// Import other components
import NavBar from './components/NavBar';
import Complaints from './components/Complaints';
import Login from './components/Login';
import Home from './components/Home';
import OpenComplaints from './components/OpenComplaints'
import ClosedComplaints from './components/ClosedComplaints'
import TopComplaints from './components/TopComplaints'


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
        <Route index element={<Home/>}></Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='complaints' element={<Complaints/>}></Route>
        <Route path='open' element={<OpenComplaints/>}></Route>
        <Route path='closed' element={<ClosedComplaints/>}></Route>
        <Route path='top' element={<TopComplaints/>}></Route>
          
      </Routes>
      

      {/* Testing complaints */}
      {/* <Login/> */}
      
      {/* <Complaints/> */}
      

    </div>
  );
}

export default App;
