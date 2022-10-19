// Navbar for all sites.
import React, {Component, useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';

export default class NavBar extends Component { 

    

    render() {

        const [isAuth, setIsAuth] = useState(false);

        useEffect(() => {
            if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
            }
        }, []);
        no
        return(
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/home">
                                Home
                            </NavLink>
                        </li>
                        {isAuth === true ? (
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
}