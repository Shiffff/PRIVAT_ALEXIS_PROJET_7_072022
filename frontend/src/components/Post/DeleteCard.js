import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from "../../feature/post.slice";


const DeleteCard = (props) => {
    const dispatch = useDispatch();
  
    const deleteQuote = () => dispatch(deletePost(props.id));
  
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

