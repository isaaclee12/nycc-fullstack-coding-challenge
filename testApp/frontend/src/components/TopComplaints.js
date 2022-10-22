// This file contains the code for getting complaints
import React, {Component, useState, useEffect} from "react";

const Complaints = () => {    

    // useState here is used to manage the response recieved from the Django API
    const [complaintsList, setComplaintsList] = useState([]);

    const user_token = "856ae7d2b22179fb6fd88a8b17d0168ae82722ed" //aadam's token, things to test

    // useEffect runs only once on page load and manages HTTP requests via axios
    useEffect(() => {

        let token_string = "Token " + sessionStorage.getItem("userToken");
        console.log("Sent in token:", token_string);

        // This is the get request that uses the councilperson's token to allow
        // the user to GET the data for complaints from the backend
        fetch("http://localhost:8000/api/complaints/topComplaints" ,{ //?username=" + query
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
            <h2 class="text-2xl my-4">Top 3 Complaint Types</h2>
            
                <ol class="list-decimal"> 
                    {complaintsList.map(complaints=>
                    <li key={complaints.complaint_type}>
                        {complaints.complaint_type} ({complaints.count} Complaints)
                    </li>
                    )}
                </ol>
        </div>
    )

}

export default Complaints;