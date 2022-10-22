// Navbar for all sites.
import React, {Component, useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';



const NavBar = () => { 
    
    function handleLogout() {
        sessionStorage.removeItem("userToken");
        console.log(sessionStorage.getItem("userToken"));
        setIsLoggedIn(false);
    }

    // const isLoggedIn = true
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        // NOTE for whoever reviews this: I'm aware that the code below
        // may be a silly solution for keeping the navbar updated based on
        // login status, but given the time constraint this is what
        // I put together in order to make it functional.  
        setInterval(() => {
            // If we have a token, say that we're logged in, and vice versa
            if (sessionStorage.getItem("userToken") !== null) {
                console.log("LOGGING IN WITH:" + sessionStorage.getItem("userToken"));
                setIsLoggedIn(true);
            }
        }, []);
        
    }, 1000);

    return(
        <div>
            {/* <p> TOKEN: {sessionStorage.getItem("userToken")} </p> */}
            <nav class="md lg relative flex-wrap items-center justify-between bg-gray-100 shadow-lg sticky top-0 container-fluid navbar-collapse">
                       
                        <NavLink class="text-2xl m-4" to="/">
                            New York City Council Complaint Database
                        </NavLink>
                    
                    {isLoggedIn === false ? (

                        <NavLink class="mx-4" to="/login">
                            Login
                        </NavLink>

                    ) : (

                        <div>

                            <NavLink class="mx-4" to="/complaints">
                                All Complaints To Your District
                            </NavLink>

                            <NavLink class="mx-4" to="/open">
                                Open Complaints
                            </NavLink>

                            <NavLink class="mx-4" to="/closed">
                                Closed Complaints
                            </NavLink>

                            <NavLink class="mx-4" to="/top">
                                Top 3 Complaint
                            </NavLink>
                            
                            <NavLink class="mx-4" to="/constituent-complaints">
                                Complaints from Constituents Residing In Your District
                            </NavLink>

                            <NavLink class="mx-4" to="/" onClick={handleLogout}>
                                Logout
                            </NavLink>

                        </div>
                    )
                    }

            </nav>
        </div>
    )
}

export default NavBar;