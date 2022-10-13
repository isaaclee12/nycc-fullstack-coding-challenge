// import libraries
import React, {useState, useEffect, BrowserRouter, Route, Switch} from 'react';
import axios from 'axios';

// import css
import './App.css';

// Import other components
import {Complaints} from './Complaints';
import {Login} from './Login';

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
      {/* TESTING GET */}
      <p>Below should be the response for "/admin/"</p>
      <div>{post}</div>

      {/* ROUTES */}
      <BrowserRouter>
        <Route path ="/">
          <Route path='complaints' component={<Complaints/>}/>
          <Route path='admin' component={<Login/>}/>
        </Route>
      </BrowserRouter>
      

      {/* LOGIN BELOW */}
      <center> <h1> City Council Complaint Database Login </h1>   
      <form method="POST">     
      
            <label>Username : </label>   
              <input type="text" placeholder="Enter Username" name="username" required/>  

            <br/>
            
            <label>Password : </label>   
              <input type="password" placeholder="Enter Password" name="password" required/>
            
            <br/>

            <input type="submit" value="Submit"/>

      </form>     
      </center>
    </div>
  );
}

export default App;
