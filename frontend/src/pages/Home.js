import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../components/AppContext";


export default function Home(){
    const uid = useContext(UidContext)

    return(
        <>
        <div className="home">
        <h1>Home</h1>
        <div>Welcome{uid.name}</div>
        </div>
        </>
    )
}