import React from "react";

const ComplaintsTableHead = () => {
    return(
        <thead>
            <tr>
                <th>Unique Key</th>
                <th>District Complained To</th>
                <th>Open Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>ZIP</th>
                <th>Borough</th>
                <th>City</th>
                <th>District of Complainer</th>
                <th>Community Board</th>
                <th>Close Date</th>
            </tr>
        </thead>
    )
}

export default ComplaintsTableHead;