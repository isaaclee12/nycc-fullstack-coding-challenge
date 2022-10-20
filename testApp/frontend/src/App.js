// import libraries
import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';

// Import other components
import NavBar from './components/NavBar';
import Complaints from './components/Complaints';
import Login from './components/Login';


function App() {

  return (
    <div className="App">
      {/* NavBar */}
      <NavBar/>

      {/* TESTING GET */}
      {/* <p>Below should be the response for "/admin/"</p> */}
      {/* <div>{post}</div> */}

      {/* ROUTES */}
      {/* <Routes>
        <Route path ="/">
          <Route exact path='' element={<Login/>}></Route>
          <Route exact path='complaints' element={<Complaints/>}></Route>
        </Route>
      </Routes> */}
      

      {/* Testing complaints */}
      <Login/>
      
      {/* <Complaints/> */}
      

    </div>
  );
}

export default App;
