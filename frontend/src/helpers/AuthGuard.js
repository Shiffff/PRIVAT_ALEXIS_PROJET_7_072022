import { Navigate } from "react-router-dom";

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token


    
}











const AuthGuard = ({children}) => {
    if(!isLogged()){
        return <Navigate to="/connexion"/>
    }
    return children;
};

export default AuthGuard;