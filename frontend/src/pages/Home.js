import { useSelector } from 'react-redux';
import Thread from '../components/Thread';


export default function Home(){
    const userData = useSelector((state) => state.user.user)

    return(
        <div className="home">
            <div className='main'>
                <Thread />
            </div>
        </div>
    )
}