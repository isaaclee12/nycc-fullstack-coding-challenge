// This file contains the code for getting complaints
import React, {useState, useEffect} from "react";
import ComplaintsTableHead from "./ComplaintsTableHead";

const OpenComplaints = () => {    

    // useState here is used to manage the response recieved from the Django API
    const [complaintsList, setComplaintsList] = useState([]);

    const user_token = "856ae7d2b22179fb6fd88a8b17d0168ae82722ed" //aadam's token, things to test

    // useEffect runs only once on page load and manages HTTP requests via axios
    useEffect(() => {

        let token_string = "Token " + sessionStorage.getItem("userToken");
        console.log("Sent in token:", token_string);

        // This is the get request that uses the councilperson's token to allow
        // the user to GET the data for complaints from the backend
        fetch("http://localhost:8000/api/complaints/closedCases" ,{ //?username=" + query
          method: "GET",
          mode: "cors",
          headers: {
            // "Content-Type": "application/json",
            // Replace token_string with "Token e9129ea22a9b40643214206941c0fda95ba1f1a9" to test 1 => 01 thing
            // Replace token_string with "Token 8dd60cff5f79bbf9b76070fd164a32283b0e0bb5" to test null closedates
            "Authorization": token_string
          },
        })

        // This code extracts the json data from the server's
        // Response, logs it, then sets our complaintsList as the data recieved
          .then((response) => response.json()
          .then(data => {
            console.table("Got back:", data);
            setComplaintsList(data);
          })
        
        // Error catcher
        ).catch(
          (error) => {
            console.log("Error fetching complaint data: " + error)
            // TODO: Send not authorized error message
          }
        )

    }, []) // "[]" here causes a singular run at the first render

    return(
        <div>
            <h2>This is the CLOSED complaints list</h2>

            <table>
                
                <ComplaintsTableHead/>

                <tbody>

                    {/* For each complaint in the data, print a row of html with the data held by each entry */}
                    {complaintsList.map(complaints=>
                        <tr key={complaints.unique_key}>
                            <td> {complaints.unique_key} </td>
                            <td> {complaints.account} </td>
                            <td> {complaints.opendate} </td>
                            <td> {complaints.complaint_type} </td>
                            <td> {complaints.descriptor} </td>
                            <td> {complaints.zip} </td>
                            <td> {complaints.borough} </td>
                            <td> {complaints.city} </td>
                            <td> {complaints.council_dist} </td>
                            <td> {complaints.community_board} </td>
                            <td> {complaints.closedate} </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}

export default OpenComplaints;