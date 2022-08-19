import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';


export default function Home(){

    return(
        <div className="home">
            <div className='main'>
                <NewPostForm/>
                <Thread />
            </div>
        </div>
    )
}