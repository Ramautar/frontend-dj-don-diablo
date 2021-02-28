import React, { useState, useContext } from 'react';
import logo from '../../assets/Logo.jpg'
import "./Navbar.css";
import {NavLink} from "react-router-dom";
import Button from "../button/Button";
import { AuthContext, useAuthState } from "../../context/AuthContext";


function Navbar() {
    const [click, setClick] = useState(false);


    const { isAuthenticated, user } = useAuthState();
    const { logout } = useContext(AuthContext);

    const handleClick = ()=> setClick(!click);
    const closeMenu = ()=> setClick(false);

    return (
        <>
            <div className="nav-bar-container">
                <nav className="nav-bar">
                    <div className='burger-menu' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <div className= {`navbar-username ${user ? "": "username-hide" }`} >
                        { user &&
                        <div>
                            <p>Welkom!!!</p>
                            <p>{user.username}</p>
                        </div>
                        }
                    </div>
                    <ul>
                        <li onClick={closeMenu}>
                            <NavLink exact to="/" activeClassName="activeLink">HOME</NavLink>
                        </li>
                        <li onClick={closeMenu}>
                            <NavLink to="/demo-drop" activeClassName="activeLink">DROP DEMO</NavLink>
                        </li>
                        <li>
                            <img src={logo} alt='logo'/>
                        </li>
                        <li onClick={closeMenu}>
                            <NavLink to="/sign-up" activeClassName="activeLink">SIGN UP</NavLink>
                        </li>
                    </ul>
                    <div className="nav-btn" onClick={closeMenu}>
                        {isAuthenticated ? (
                            <Button buttonSize={1} onClick={() =>logout()} >SIGN OUT</Button>
                        ):(
                            <NavLink to="/login"><Button buttonSize={1} onClick={()=>{}}>LOGIN</Button></NavLink>
                        )}
                    </div>
                </nav>
            </div>
            <ul className={` drop-down-menu  menu-${click ? "close" : "open"}`}>
                <li onClick={closeMenu}>
                    <NavLink exact to="/" activeClassName="activeLink">HOME</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to="/demo-drop" activeClassName="activeLink">DROP DEMO</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to="/sign-up" activeClassName="activeLink">SIGN UP</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to="/login" activeClassName="activeLink">LOGIN</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to="/my-demos" activeClassName="activeLink">My Demos</NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to="/my-profile" activeClassName="activeLink">My Profile</NavLink>
                </li>
                {user && (user.roles).includes("ROLE_ADMIN") &&
                    <>
                        <li onClick={closeMenu}>
                            <NavLink to="/admin-controller">Administrator</NavLink>
                        </li>
                        <li onClick={closeMenu}>
                            <NavLink exact to="/user-profile" activeClassName=" nav activeLink">Edit Profile</NavLink>
                        </li>
                    </>
                }
            </ul>
        </>
    )
}

export default Navbar;
