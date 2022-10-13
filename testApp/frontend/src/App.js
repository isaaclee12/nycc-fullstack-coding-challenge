// import libraries
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// import css
import './App.css';

// Import other components
import NavBar from './Nav';
import Complaints from './Complaints';
import Login from './Login';

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
        <Route path ="/">
          <Route exact path='' element={<Login/>}></Route>
          <Route exact path='complaints' element={<Complaints/>}></Route>
        </Route>
      </Routes>
      


    </div>
  );
}

export default App;
