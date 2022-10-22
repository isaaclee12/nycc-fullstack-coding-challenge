import React from "react";

const ComplaintsTableHead = () => {
    return(
        <thead>
            <tr>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">Unique Key</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">District Complained To</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">Open Date</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">Type</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">Description</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">ZIP</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">Borough</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">City</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">District of Complainer</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">Community Board</th>
                <th scope="col" class="text-md font-medium text-gray-900 px-3 py-3">Close Date</th>
            </tr>
        </thead>
    )
}

export default ComplaintsTableHead;