import React from "react";

const ComplaintsTableHead = () => {
    return(
        <thead>
            <tr>
                <th>unique_key</th>
                <th>account</th>
                <th>opendate</th>
                <th>complaint_type</th>
                <th>descriptor</th>
                <th>zip</th>
                <th>borough</th>
                <th>city</th>
                <th>council_district</th>
                <th>community_board</th>
                <th>closedate</th>
            </tr>
        </thead>
    )
}

export default ComplaintsTableHead;