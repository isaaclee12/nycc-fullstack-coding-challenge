// import libraries
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios';

// import css
import './App.css';

// Import other components
import NavBar from './Nav';
import Complaints from './Complaints';
import Login from './Login';

function App() {
  // useState here is used to manage the "post", i.e. response recieved from the Django API
  const [post, setPost] = useState(null);

  // useEffect runs only once on page load and manages HTTP requests via axios
  useEffect(() => {
    axios.get("http://localhost:8000/admin/").then(
      (response) => {
        setPost(response.data)
      }
    )
  }, []) // "[]" here causes a singular run at the first render

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
          <Route exact path='admin' element={<Login/>}></Route>
          <Route exact path='complaints' element={<Complaints/>}></Route>
        </Route>
      </Routes>
      


    </div>
  );
}

export default App;
