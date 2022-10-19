// import libraries
import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

// Import other components
import NavBar from './NavBar';
// import Complaints from './Complaints';
// import Login from './Login';

class Login extends Component {

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


const API_URL = "http://localhost:8000/"
class Complaints extends Component {

    constructor(props) {
        super(props);

        //list that will contain complaints from api
        this.state={
            complaints:[]
        }
    }

    populateData() {
        fetch(API_URL+'api/complaints',{
          method: "GET",
          mode: "cors",
          headers: {
            // 'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "http://localhost:5000/",
            "Access-Control-Allow-Methods": "GET,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        })
          .then((response) => response.json()
          .then((json) => {
            console.log(json);
          })
            //     data=>{
            //         this.setState({complaints:data});
            //     }
            // )       
        ).catch(
          (error) => {
            console.log("Error fetching complaint data:" + error)
          }
        ).finally(
          console.log("bwah")
        )
    }

    componentDidMount() {
        this.populateData();
    }


    render() {

        // // useState here is used to manage the response recieved from the Django API
        // const [post, setPost] = useState(null);

        // // useEffect runs only once on page load and manages HTTP requests via axios
        // useEffect(() => {
        //     axios.get("http://localhost:8000/complaints/").then(
        //     (response) => {
        //         setPost(response.data)
        //     }
        //     )
        // }, []) // "[]" here causes a singular run at the first render

        // declare complaints var
        const {
            complaints
        }=this.state;

        return(
            <div>
                <h2>This is the complaints list</h2>

                <table>
                    <thead>
                        <tr>
                            {/* TODO: Order is currently mirroring SQLite3 DB, rearrange later to make sense. */}
                            <th>unique_key</th>
                            <th>account</th>
                            <th>opendate</th>
                            <th>complaint_type</th>
                            <th>descriptor</th>
                            <th>zip</th>
                            <th>borough</th>
                            <th>city</th>
                            <th>council_district</th>
                            {/* <!-- TODO figure out if this is the c.board for the complainer's dist. or the dist. complaint was made --> */}
                            <th>community_board</th>
                            <th>closedate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(c=>
                            <tr key={c.unique_key}>
                                <td key={c.unique_key}></td>
                                <td key={c.account}></td>
                                <td key={c.opendate}></td>
                                <td key={c.complaint_type}></td>
                                <td key={c.descriptor}></td>
                                <td key={c.zip}></td>
                                <td key={c.borough}></td>
                                <td key={c.city}></td>
                                <td key={c.council_district}></td>
                                <td key={c.community_board}></td>
                                <td key={c.closedate}></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}



function App() {

  return (
    <div className="App">
      {/* NavBar */}
      <NavBar/>

      {/* TESTING GET */}
      {/* <p>Below should be the response for "/admin/"</p> */}
      {/* <div>{post}</div> */}

      {/* ROUTES */}
      {/* <Routes>
        <Route path ="/">
          <Route exact path='' element={<Login/>}></Route>
          <Route exact path='complaints' element={<Complaints/>}></Route>
        </Route>
      </Routes> */}
      

      {/* Testing complaints */}
      <Login/>
      
      <Complaints/>
      

    </div>
  );
}

export default App;
