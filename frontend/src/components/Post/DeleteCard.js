import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from "../../feature/post.slice";


const DeleteCard = (props) => {
    const dispatch = useDispatch();
  
    const deleteQuote = () => 
      axios ({
    method: "delete",
    url:`${process.env.REACT_APP_API_ENDPOINT}/post/post/${props.id}`,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    })
    .then((res) =>{
      dispatch(deletePost(props.id));;
    })
    .catch((err) => console.log('err'))

  
    return (
      <div
        onClick={() => {
          if (window.confirm("Voulez-vous supprimer cet article ?")) {
            deleteQuote();
          }
        }}
      >
        <img className="unfollowPost" src="../trash.svg" alt='delete'></img>
      </div>
    );
  };
  
  export default DeleteCard;

