import React from 'react';
import { NavLink } from "react-router-dom"



const removeLocalStorage = () => {
    localStorage.clear();   
}

export default function menuHome() {
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink exact to="/">
                        <div className='logo'>
                            <img src="../icon-left-font-monochrome-black.png" alt='icon'></img>
                        </div>
                    </NavLink>
                </div>
                    <h3>settings</h3>
                    <div className='logout' onClick={removeLocalStorage}>
                    <NavLink exact to="/signIn">
                    <img  src="../logout.svg" alt='icon logout'></img>
                    </NavLink>
                    </div>
            </div>
        </nav>
    )
}


