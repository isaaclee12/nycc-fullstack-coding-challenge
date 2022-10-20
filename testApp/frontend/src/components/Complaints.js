// This file contains the code for getting complaints
import React, {Component, useState, useEffect} from "react";

const API_URL = "http://localhost:8000/"
const Complaints = () => {    

    // useState here is used to manage the response recieved from the Django API
    const [complaintsList, setComplaintsList] = useState([]);

    const user_token = "856ae7d2b22179fb6fd88a8b17d0168ae82722ed" //aadam's token, things to test

    // useEffect runs only once on page load and manages HTTP requests via axios
    useEffect(() => {

        let token_string = "Token " + user_token;
        console.log(token_string);
        
        // This is the get request that uses the councilperson's token to allow
        // the user to GET the data for complaints from the backend
        fetch(API_URL+"api/complaints",{
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token_string//`Token ${user_token}`
          }
        })

        // This code extracts the json data from the server's
        // Response, logs it, then sets our complaintsList as the data recieved
          .then((response) => response.json()
          .then(data => {
            console.log(data);
            setComplaintsList(data);
          })
        
        // Error catcher
        ).catch(
          (error) => {
            console.log("Error fetching complaint data: " + error)
          }
        )

    }, []) // "[]" here causes a singular run at the first render

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

                    {/* For each complaint in the data, print a row of html with the data held by each entry */}
                    {complaintsList.map(complaints=>
                        <tr key={complaints.unique_key}>
                            <td key={complaints.unique_key}></td>
                            <td key={complaints.account}></td>
                            <td key={complaints.opendate}></td>
                            <td key={complaints.complaint_type}></td>
                            <td key={complaints.descriptor}></td>
                            <td key={complaints.zip}></td>
                            <td key={complaints.borough}></td>
                            <td key={complaints.city}></td>
                            <td key={complaints.council_district}></td>
                            <td key={complaints.community_board}></td>
                            <td key={complaints.closedate}></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}

export default Complaints;