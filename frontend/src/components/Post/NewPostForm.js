import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setPostData } from "../../feature/post.slice";
import { timestampParser } from "../../utils/utils";

const NewPostForm = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("image", file);

      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_ENDPOINT}/post/post/${userData._id}`,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },

        data: data,
      }).then((res) => {
        const getallposts = async () => {
          await axios({
            method: "get",
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
    
            url: `${process.env.REACT_APP_API_ENDPOINT}/post/posts`,
          })
            .then((res) => {
              dispatch(setPostData(res.data));
              cancelPost();
              console.log("ok");
            })
            .catch((err) => console.log("err"));
        };
        getallposts();
      });
    } else {
      alert("veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="post-container">
      <>
        <div className="data">
          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.imageUrl} alt="pic de profil"></img>
              <h3>
                 {userData.firstName} {userData.name}
              </h3>
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
              <div className="card-visual-container">
            {message || postPicture ? (
              <li className="card-container card-visual">
                <div className="card-left">
                  <img src={userData.imageUrl} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>
                        {userData.name} {userData.firstName}
                      </h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                  </div>
                </div>
              </li>
            ) : null}
            </div>
            <div className="footer-form">
              <div className="icon">
                <img className="picture" src="../picture.svg" alt="pic"></img>
                <input
                  type="file"
                  id="file-upload"
                  name="file"
                  accept=".jpg, .jpeg, .png, .gif/"
                  onChange={(e) => handlePicture(e)}
                />
              </div>
              <div className="btn-send">
                {message || postPicture ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default NewPostForm;
