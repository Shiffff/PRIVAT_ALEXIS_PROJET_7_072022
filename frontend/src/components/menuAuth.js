import { NavLink } from "react-router-dom"

export default function MenuAuth() {
    return(
        <div className="MenuAuth">
            <ul>
                <li><NavLink to="/SignIn" className={({ isActive }) => (isActive ? "activeLink" : undefined) }>SignIn</NavLink></li>
                <li><NavLink to="/SignUp"className={({ isActive }) => (isActive ? "activeLink" : undefined) }>SignUp</NavLink></li>
            </ul>
        </div>
    )
}