import React from 'react';
import {Link} from "react-router-dom";
import logo from './assets/logo.png'
import {useGlobalContext} from "./context";

const NavBar = () => {

    const {favoriteList} = useGlobalContext()

    return (
        <nav className="navbar">
            <div className="nav-center">
                <Link to='/'>
                    <img src={logo} alt="logo" className="logo"/>
                </Link>
                <ul className='nav-links'>
                    <li>
                        <Link to='/'>home</Link>
                    </li>
                    <li>
                        <Link to='/list'>favorite{favoriteList.length > 0? `: ${favoriteList.length}`: ''}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;