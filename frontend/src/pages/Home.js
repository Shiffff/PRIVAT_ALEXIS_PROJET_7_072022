import { useSelector } from 'react-redux';


export default function Home(){
    const userData = useSelector((state) => state.user.user)

    return(
        <>
        <div className="home">
        <h1>Home</h1>
        <div>Welcome{userData.firstName}</div>
        </div>
        </>
    )
}