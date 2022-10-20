// Navbar for all sites.
import React, {Component, useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';

const NavBar = () => { 
    
    // const isAuth = true
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
        setIsAuth(true);
        }
    }, []);

    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </li>
                    {isAuth === false ? (
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
                                <NavLink to="/logout">
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