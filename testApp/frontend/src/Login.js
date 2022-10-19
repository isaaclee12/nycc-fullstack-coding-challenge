// This file is responsible for rendering the Login screen.
import React, {Component} from "react";

export default class Login extends Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            usernameInput: "",
            passwordInput: "",
            submit: false,
            dataResponse: {}
        }
    }

    // Change handlers, i.e. setters
    onUsernameInputChange = e => {
        this.setState({
            usernameInput: e.target.value
        });
    }
    // Change handlers, i.e. setters
    onPasswordInputChange = e => {
        this.setState({
            passwordInput: e.target.value
        });
    }
    // Change handlers, i.e. setters
    onSubmitChange = e => {
        this.setState({
            submit: e.target.value
        });
    }

    // Handle Login
    handleLogin = e => {

        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        // Debug
        console.log(user);

        fetch('http://localhost:8000/login/', {
            method: 'POST',
            mode: 'no-cors',
            headers: {                
                "Access-Control-Allow-Origin": "http://localhost:8000/",
                "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT",
                "Access-Control-Allow-Headers": "Content-Type",
                "Content-Type": 'application-json'
            },
            body: JSON.stringify(user)
        })

        .then(response => response.json())
        .then(data => {
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

    render() {

        return(
            <div>
                {/* LOGIN BELOW */}
                <center> <h1> City Council Complaint Database Login </h1>

                   {/* Form that will call handleLogin() on submit */}
                <form onSubmit={this.handleLogin} method="POST">     
                
                        <label>Username : </label>   
                        <input 
                            type="text" 
                            placeholder="Enter Username" 
                            value={this.state.usernameInput} 
                            onChange={this.onUsernameInputChange} 
                            id="username" 
                            required/>  
                        <br/>
                        
                        <label>Password : </label>   
                        <input 
                            type="password" 
                            placeholder="Enter Password" 
                            value={this.state.passwordInput} 
                            onChange={this.onPasswordInputChange} 
                            id="password" 
                            required/>
                        <br/>

                        <input type="submit" id="submit" value="Submit"/>
 
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