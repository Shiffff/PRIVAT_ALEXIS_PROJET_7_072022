import { NavLink } from "react-router-dom"
import MenuHome from "../components/menuHome";


export default function Home(){
    return(
        <>
        <MenuHome />
        <div className="home">
        <h1>Home</h1>
        <div>Welcome</div>
        </div>
        </>
    )
}