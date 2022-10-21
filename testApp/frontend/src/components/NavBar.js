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
        // If we have a token, say that we're logged in, and vice versa
        if (sessionStorage.getItem("userToken") !== null) {
            console.log("LOGGING IN WITH:" + sessionStorage.getItem("userToken"));
            setIsLoggedIn(true);
        }
        
    }, 5000);

    return(
        <div>
            <p> TOKEN: {sessionStorage.getItem("userToken")} </p>
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
                                    Complaints
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