import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../feature/post.slice";

const EditDeleteComment = ({ comment, postId }) => {
  const [IsAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      axios({
        method: "put",
        url: `http://localhost:3000/api/post/comment/${postId}`,
        data: {
          commenterId: userData._id,
          commenterName: userData.name,
          text: text,
          commentid: comment._id,
        },
      })
        .then((res) => {
          dispatch(editComment([comment._id, postId, text]));
          setText("");
          setEdit(false);
        })
        .catch((err) => console.log("err"));
    }
  };

  const handleDelete = () => {
    axios({
        method: "put",
        url: `http://localhost:3000/api/post/deletecomment/${postId}`,
        data: {
          commentid: comment._id,
        },
      })
        .then((res) => {
          dispatch(deleteComment([comment._id, postId]));
        })
        .catch((err) => console.log("err"));
    }


  useEffect(() => {
    const checkAuthor = () => {
      if (userData._id === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [userData, comment.commenterId]);

  return (
    <div className="edit-comment">
      {IsAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img className="edit" src="../edit.svg" alt="Edit"></img>
        </span>
      )}
      {IsAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          ></input>
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (
                  window.confirm("êtes vous sur de supprimer ce commentaire ?")
                ) {
                  handleDelete();
                }
              }}
            >
              <img className="edit" src="../trash.svg" alt="Edit"></img>
            </span>
          <input type="submit" value="valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
