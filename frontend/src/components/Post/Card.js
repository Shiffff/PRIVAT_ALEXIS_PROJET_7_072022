import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../../utils/utils";
import FollowHandler from "../profil/followHandler";
import { putPostData } from "../../feature/post.slice";
import LikeButton from "./LikeButton";
import axios from "axios";
import DeleteCard from "../Post/DeleteCard";
import CardComment from "./CardComment";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const updateItem = async () => {
    if (textUpdate) {
      axios({
        method: "put",
        url: `http://localhost:3000/api/post/${post._id}`,
        data: { message: textUpdate },
      })
        .then((res) => {
          console.log(res.data);
          dispatch(putPostData([textUpdate, post._id]));
          setIsUpdated(false);
        })
        .catch((err) => console.log("err"));
    }
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <div>Chargement</div>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.imageUrl;
                    else return null;
                  })
                  .join(" ")
              }
              alt="profil pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.name;
                        else return null;
                      })
                      .join("")}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post._id} type={"card"} />
                )}
              </div>
              <span className="datePost">{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    valider modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img
                    className="unfollowPost"
                    src="../edit.svg"
                    alt="edit-logo"
                  ></img>
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}

            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  className="comment-icon"
                  src="../comment.svg"
                  alt="icon logout"
                ></img>
                <span>{post.comments.lenght}</span>
              </div>
              <LikeButton post={post} />
            </div>
            {showComments && <CardComment post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
