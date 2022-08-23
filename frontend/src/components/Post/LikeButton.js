import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { setLikePost, setUnLikePost } from "../../feature/post.slice";



const LikeButton = ({ post }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const userData = useSelector((state) => state.user.user);


    const like = () => {
        axios ({
   method: "put",
   url: `${process.env.REACT_APP_API_ENDPOINT}/post/like/${post._id}`,
   data:  { id:userData._id } 
   })
   .then((res) =>{
        console.log(res.data)
       dispatch(setLikePost( [userData._id , post._id]  ))
       setLiked(true)
   })
   .catch((err) => console.log('err'))
   };



    const unlike = () => {
        axios ({
            method: "put",
            url: `${process.env.REACT_APP_API_ENDPOINT}/post/unlike/${post._id}`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
              },      
            data:  { id:userData._id } 
            })
            .then((res) =>{
                console.log(res.data)
                dispatch(setUnLikePost( [userData._id , post._id]  ))
                setLiked(false)
            })
            .catch((err) => console.log('err'))

    }

    
    useEffect(() => {
        if (post.likers.includes(userData._id)) setLiked(true)
    },[userData, post.likers, liked])

    return (
        <div className='like-container'>
            {liked === false && (
                <img className="unfollowPost" src="../heart.svg" onClick={like} alt='like'></img>
            )}
                 {liked === true && (
                <img className="unfollowPost" src="../heart-filled.svg" onClick={unlike} alt='unlike'></img>
            )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;