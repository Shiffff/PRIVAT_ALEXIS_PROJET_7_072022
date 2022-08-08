import { useContext } from "react";
import { UidContext } from "./AppContext";
import { NavLink } from "react-router-dom";

const removeLocalStorage = () => {
    localStorage.clear();   
}
    const MenuHome =  () => {
        const uid = useContext(UidContext)
    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink  to="/">
                        <div className='logo'>
                            <img src="../icon-left-font-monochrome-black.png" alt='icon'></img>
                        </div>
                    </NavLink>
                </div>
                <div className='Accueil'>
                    <NavLink  to="/" className={({ isActive }) => (isActive ? "activeLinkHome" : undefined) }>
                        <div className='Accueil'>
                            <img src="../logout.svg" alt='icon'></img>
                        </div>
                    </NavLink>
                </div>
                <div className='Profil'>
                <NavLink  to="/profil" className={({ isActive }) => (isActive ? "activeLinkHome" : undefined) }>
                <div className='logo'>
                            <img src="../logout.svg" alt='icon'></img>
                        </div>
                    </NavLink>
                </div>
                    <div className='userName'>Bienvenue {uid.name}</div>
                    <div className='logout' onClick={removeLocalStorage}>
                    <NavLink  to="/connexion">
                    <img  src="../logout.svg" alt='icon logout'></img>
                    </NavLink>
                    </div>
            </div>
        </nav>
    )
}

export default MenuHome;