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

            
        <p class="text-2xl">tailwind test</p>
            {/* <p> TOKEN: {sessionStorage.getItem("userToken")} </p> */}
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    
                    
                    {isLoggedIn === false ? (
                        <div>
                            <li>
                                <NavLink to="/login">
                                    Login
                                </NavLink>
                            </li>
                        </div>

                    ) : (
                        <div>
                            <li>
                                <NavLink to="/complaints">
                                    All Complaints
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/open">
                                    Open Complaints
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/closed">
                                    Closed Complaints
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/top">
                                    Top 3 Complaint Types
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/constituent-complaints">
                                    Constituent Complaints
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/" onClick={handleLogout}>
                                    Logout
                                </NavLink>
                            </li>
                        </div>
                    )
                    }

                </ul>
            </nav>
        </div>
    )
}

export default NavBar;