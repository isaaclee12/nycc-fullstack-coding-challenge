// This file contains the code for getting complaints
import React, {Component, useState, useEffect} from "react";

const API_URL = "http://localhost:8000/"
export default class Complaints extends Component {

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
          mode: "no-cors",
          headers: {
            // 'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "http://localhost:8000/",
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