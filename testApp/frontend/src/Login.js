import React, {Component} from "react";
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usernameInput: "",
            passwordInput: "",
            submit: false,
            dataResponse: {}
        }
    }



    handleLogin = userInput => {
        axios.post("http://localhost:8000/login/", {
                username: this.state.usernameInput,
                password: this.state.passwordInput 
            }).then(
                (response) => {
                    console.log(response.data)
                    this.state.dataResponse = response.data
                }
            )
    }

    render() {

        // Define component state vars in this function
        const {
            usernameInput
        } = this.state.usernameInput

        const {
            passwordInput
        } = this.state.passwordInput

        return(
            <div>
                {/* LOGIN BELOW */}
                <center> <h1> City Council Complaint Database Login </h1>   
                <form method="POST">     
                
                        <label>Username : </label>   
                        <input type="text" placeholder="Enter Username" value={this.state.usernameInput} id="username" required/>  

                        <br/>
                        
                        <label>Password : </label>   
                        <input type="password" placeholder="Enter Password" value={this.state.passwordInput} id="password" required/>
                        
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