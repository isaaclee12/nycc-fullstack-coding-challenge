// This file is responsible for rendering the Login screen.
import React, {Component, useState} from "react";

const Login = () => {

    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');

    // Handle Login
    const handleLogin = event => {

        event.preventDefault();

        const user = JSON.stringify({
            username: username,
            password: password
        });

        // Debug
        console.log(user);
        console.log(typeof(JSON.parse(user)));
        

        fetch('http://localhost:8000/login/', {
            method: 'POST',
            mode: 'no-cors',
            headers: {                
                // "Access-Control-Allow-Origin": "http://localhost:8000/",
                // "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT",
                // "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": 'application/json'
            },
            data: {
                "username": "isaac",
                "password": "5FX8fNGHtrA5%Rz#"
            }// testing preset data    
        })

        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.key) {
                localStorage.clear();
                localStorage.setItem('token', data.key);
                window.location.replace('http://localhost:3000/');
            } else {
                localStorage.clear();
            }
        })
        
        .catch(err => {
            console.log("Error: Failure when processing login: " + err);
        })
    }


    return(
        <div>
            {/* LOGIN BELOW */}
            <center> <h1> City Council Complaint Database Login </h1>

                {/* Form that will call handleLogin() on submit */}
            <form method="POST">     
            
                    <label>Username : </label>   
                    <input 
                        type="text" 
                        placeholder="Enter Username" 
                        value={username} 
                        onChange={event => setUsername(event.target.value)} 
                        id="username" 
                        required/>  
                    <br/>
                    
                    <label>Password : </label>   
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        value={password} 
                        onChange={event => setPassword(event.target.value)} 
                        id="password" 
                        required/>
                    <br/>

                    <input type="submit" id="submit" onClick={handleLogin} value="Submit"/>

                    {/* TODO: 
                    if authenticated:
                        goto /complaints/
                    else:
                        stay on this page, display error */}

            </form>     
            </center>
        </div>
    )
}

export default Login;