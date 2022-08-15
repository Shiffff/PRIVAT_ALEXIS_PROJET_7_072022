import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";



const removeLocalStorage = () => {
    localStorage.clear();   
}
    const MenuHome =  () => {
    const userData = useSelector((state) => state.user.user);

    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink  to="/">
                        <div className='logo'>
                            <img className='logoIconeGroup logosIcones'src="../297802923.png" alt='icon'></img>
                        </div>
                    </NavLink>
                </div>
                <div className='Accueil'>
                    <NavLink  to="/" className={({ isActive }) => (isActive ? "activeLinkHome" : undefined) }>
                        <div className='Accueil'>
                        <img className='logoIconeHome logosIcones'  src="../home.svg" alt='icon logout'></img>
                        </div>
                    </NavLink>
                </div>
                <div className='Profil'>
                <NavLink  to="/profil" className={({ isActive }) => (isActive ? "activeLinkHome" : undefined) }>
                <div className='logo'>
                    <img className='logoIconeUser logosIcones'  src="../user.svg" alt='icon logout'></img>
                        </div>
                    </NavLink>
                </div>
                    <div className="nameMenu">Hello {userData.name} <img className='img-profile'src={userData.imageUrl} alt='icon'></img></div>
                    <div className='userName'></div>
                    <div className='logout' onClick={removeLocalStorage}>
                    <NavLink  to="/connexion">
                    <img className='logoIconeLogout logosIcones'  src="../logout.svg" alt='icon logout'></img>
                    </NavLink>
                    </div>
            </div>
        </nav>
    )
}

export default MenuHome;