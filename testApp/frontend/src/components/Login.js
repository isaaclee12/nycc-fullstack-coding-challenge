// This file is responsible for rendering the Login screen.
import React, {Component, useState} from "react";

class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    // This function changes the state-variables to the user's form input
    // setCredentials = event => {
    //     const creds = this.state.credentials; // Make a copy of the credentials object
    //     creds[event.target.name] = event.target.value; // Set the state var to the value of the form field's var
    //     this.setState({credentials: creds}); // Set the original values
    // }

    setUsername = event => {
        this.setState({username: event.target.value});
    }

    setPassword = event => {
        this.setState({password: event.target.value});
    }

    // Handle Login
    handleLogin = event => {

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log("login sent, " + JSON.stringify(user))

        fetch('http://localhost:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Token 04147e7b4c0221ff2e8be1fd5162eaac2dbd9ee5'
            },
            body: JSON.stringify(user)
        })

        .then(response => response.json )
        .then(
            data => {
                console.log(data);
            }
        )

        .catch(error => console.error(error));

        // event.preventDefault();

        // const user = JSON.stringify({
        //     username: username,
        //     password: password
        // });

        // // Debug
        // console.log(user);
        // console.log(typeof(JSON.parse(user)));
        

        // fetch('http://localhost:8000/login/', {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     headers: {                
        //         // "Access-Control-Allow-Origin": "http://localhost:8000/",
        //         // "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT",
        //         // "Access-Control-Allow-Headers": "Content-Type",
        //         "Content-Type": 'application/json'
        //     },
        //     data: {
        //         "username": "isaac",
        //         "password": "5FX8fNGHtrA5%Rz#"
        //     }// testing preset data    
        // })

        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     if (data.key) {
        //         localStorage.clear();
        //         localStorage.setItem('token', data.key);
        //         window.location.replace('http://localhost:3000/');
        //     } else {
        //         localStorage.clear();
        //     }
        // })
        
        // .catch(err => {
        //     console.log("Error: Failure when processing login: " + err);
        // })
    };


    render() {
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
                            // value={this.state.credentials.username} 
                            onChange={this.setUsername}
                            id="username" 
                            required/>  
                        <br/>
                        
                        <label>Password : </label>   
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            // value={this.state.credentials.password} 
                            onChange={this.setPassword}
                            id="password" 
                            required/>
                        <br/>

                        <button onClick={this.handleLogin}>Login</button>

                        <input type="submit" id="submit" onClick={this.handleLogin} value="Submit"/>

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
}

export default Login;