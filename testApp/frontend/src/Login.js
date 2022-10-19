// This file is responsible for rendering the Login screen.
import React, {Component} from "react";
import axios from 'axios';

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
        // axios.post("http://localhost:8000/login/", {
        //         username: this.state.usernameInput,
        //         password: this.state.passwordInput 
        //     }).then(
        //         (response) => {
        //             console.log(response.data)
        //             this.setState ({
        //                 dataResponse: response.data
        //             })
        //         }
        //     )
        e.preventDefault();
        const data = {
            username: this.state.usernameInput,
            password: this.state.password
        };
        axios
            .post("http://localhost:8000/login/", data)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {

        return(
            <div>
                {/* LOGIN BELOW */}
                <center> <h1> City Council Complaint Database Login </h1>   
                <form method="POST">     
                
                        <label>Username : </label>   
                        <input type="text" placeholder="Enter Username" value={this.state.usernameInput} 
                        onChange={this.onUsernameInputChange} id="username" required/>  
                        <br/>
                        
                        <label>Password : </label>   
                        <input type="password" placeholder="Enter Password" value={this.state.passwordInput} 
                        onChange={this.onPasswordInputChange} id="password" required/>
                        <br/>

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