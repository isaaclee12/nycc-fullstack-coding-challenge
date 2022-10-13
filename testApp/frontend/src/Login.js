import React, {Component} from "react";

export default class Login extends Component {
    render() {
        return(
            <div>
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
        )
    }
}