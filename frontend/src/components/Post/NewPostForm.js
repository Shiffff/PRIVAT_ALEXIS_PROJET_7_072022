import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setPostData } from "../../feature/post.slice";

const NewPostForm = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const urlPosts = `http://localhost:3000/api/post/posts`;


  const handlePost = async () => {
    if (message || postPicture){
        const data = new FormData();
        data.append('posterId', userData._id);
        data.append('message', message);
        if (file) data.append("image", file)

        await axios({
            method: "post",
            url: `http://localhost:3000/api/post/post/${userData._id}`,
            data: data
        })
        .then((res) =>{
            const getallposts = async() => {
              await axios ({
            method: "get",
            url: urlPosts,
            })
            .then((res) =>{
              dispatch(setPostData(res.data));
              cancelPost();
                console.log("ok")
            })
            .catch((err) => console.log('err'))
            };
            getallposts();

          })    
        }else{
        alert("veuillez entrer un message")
    }
  };


  const handlePicture = (e) => {
    setFile(e.target.files[0]);
    
  };



  const cancelPost = () => {
    setMessage('');
    setPostPicture('');
    setFile('');
  };



  return (
    <div className="post-container">
      <>
        <div className="data">
          <NavLink to="/profil">
            <div className="user-info">
              <img src={userData.imageUrl} alt="photo de profil"></img>
              <h3>{userData.name}</h3>
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
            </div>
            <div className="btn-send">
                {message || postPicture ? (
                <button className="cancel" onClick={cancelPost}>Annuler message</button>) : null}
                <button className="send" onClick={handlePost}>Envoyer</button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default NewPostForm;
