// Navbar for all sites.
import React, {Component} from "react";
import {NavLink} from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return(
            <div>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/complaints">
                                Complaints
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}