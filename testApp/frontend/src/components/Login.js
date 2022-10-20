// This file is responsible for rendering the Login screen.
import React, {Component, useState} from "react";
import { useNavigate } from "react-router";

const Login = () => {

    let state = {
        username: "",
        password: ""
    }

    // This function changes the state-variables to the user's form input
    // setCredentials = event => {
    //     const creds = state.credentials; // Make a copy of the credentials object
    //     creds[event.target.name] = event.target.value; // Set the state var to the value of the form field's var
    //     this.setState({credentials: creds}); // Set the original values
    // }

    let setUsername = event => {
        state.username = event.target.value;
    }

    let setPassword = event => {
        state.password = event.target.value;
    }

    const navigate = useNavigate();

    // Handle Login
    const handleLogin = event => {

        event.preventDefault();

        const user = {
            // username: state.username,
            // password: state.password
            username: 'isaac',
            password: '5FX8fNGHtrA5%Rz#'
        }

        console.log("Sending login:" + JSON.stringify(user))

        fetch('http://localhost:8000/login/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(user)
        })

        .then(response => response.json())// response => response.json)
        .then(
            json => {
                // Debug
                console.log(json.token);

                // Set token for session to token returned from API
                localStorage.setItem("userToken", json.token);

                // Send user to the complaints page
                navigate('/complaints');
            }
        )

        .catch(
            error => console.error(error)
            // TODO: Make this a thing: history.push('login-fail/')
        );
    };

    return(
        <div>
            {/* LOGIN BELOW */}
            <center> <h1> City Council Complaint Database Login </h1>

                {/* Form that will call handleLogin() on submit 
                TODO: method="POST"*/}
            <form >     
            
                    <label>Username : </label>   
                    <input 
                        type="text" 
                        placeholder="Enter Username" 
                        // value={state.credentials.username} 
                        onChange={setUsername}
                        id="username" 
                        required/>  
                    <br/>
                    
                    <label>Password : </label>   
                    <input 
                        type="password" 
                        placeholder="Enter Password" 
                        // value={state.credentials.password} 
                        onChange={setPassword}
                        id="password" 
                        required/>
                    <br/>

                    <button type="button" onClick={handleLogin}>Login</button>

                    {/* <input type="submit" id="submit" onClick={this.handleLogin} value="Submit"/> */}

                    {/* TODO: 
                    if authenticated:
                        goto /complaints/
                    else:
                        stay on this page, display error */}

            </form>     
            </center>
        </div>
    )
    // render() {
    // }
}

export default Login;