import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostData } from "../../feature/post.slice";
import { isEmpty, timestampParser } from "../../utils/utils";
import EditDeleteComment from "./EditDeleteComment";


const CardComment = ({ post }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);
  const urlPosts = `http://localhost:3000/api/post/posts`;


  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      axios ({
        method: "post",
        url: `http://localhost:3000/api/post/comment/${post._id}`,
        data:  { commenterId:userData._id, commenterName:userData.name, text:text } 
        })
        .then((res) =>{
          const getallposts = async() => {
            await axios ({
          method: "get",
          url: urlPosts,
          })
          .then((res) =>{
          setText('')
          dispatch(setPostData(res.data));
          })
          .catch((err) => console.log('err'))
          };
          getallposts();
        })
        .catch((err) => console.log('err'))
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part-comment">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId)
                        return user.imageUrl;
                      else return null;
                    })
                    .join(" ")
                }
                alt="profil pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commenterName} {userData.firstName}</h3>
                </div>
                <span className="comment-date">{timestampParser(comment.timestamp)}</span>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id}/>
              </div>
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Commenter ..."
          />
          <br />
          <input type="submit" value="envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComment;
