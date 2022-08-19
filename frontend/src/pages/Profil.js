import React, { useState } from "react";
import UploadImg from "../components/profil/UploadImg";
import FollowHandler from "../components/profil/followHandler";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUpdateBio } from "../feature/user.slice";
import { dateParser } from "../utils/utils";

const Profil = () => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [ setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);

  const [followingPopup, setfollowingPopup] = useState(false);
  const [followersPopup, setfollowersPopup] = useState(false);

  const handleDelete = () => {
    axios ({
      method: "delete",
      url:`http://localhost:3000/api/user/${userData._id}`,
  
      })
      .then((res) =>{
      localStorage.clear()
      window.location.reload();

      })
      .catch((err) => console.log('err'))
  
    }




  const handleUpdate = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `http://localhost:3000/api/user/${userData._id}`,
      data: { bio },
    }).then(() => {
      dispatch(setUpdateBio(bio));
      setUpdateForm(false);
    });
  };

  return (
    <>
      <div className="profil-container">
        <h1> Mon profil</h1>
        <div className="uptdate-container">
          <div className="left-part">
            <h3>{userData.name} {userData.firstName}</h3>
            <img src={userData.imageUrl} alt="img de profil" />
            <UploadImg />
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
                  <textarea
                    type="text"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}>
                  </textarea>
                  <button onClick={handleUpdate}>Valider modifications</button>
            </div>
            <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
            <h5 onClick={() => setfollowingPopup(true)}>
              Abonnements :
              {userData.following ? userData.following.length : "0"}
            </h5>
            <h5 onClick={() => setfollowersPopup(true)}>
              Abonnés : {userData.followers ? userData.followers.length : "0"}
            </h5>
            <div className="btn">
            <span
              onClick={() => {
                if (
                  window.confirm("êtes vous sur de vouloir supprimer votre profil ?")
                ) {
                  handleDelete();
                }
              }}
            >
          <input type="submit" value="Supprimer profil" />
            </span>
          </div>
          </div>
        </div>
        {followingPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnements</h3>
              <span className="cross" onClick={() => setfollowingPopup(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  let renvoyer;
                  for (let i = 0; i < userData.following.length; i++) {
                    if (user._id === userData.following[i]) {
                      renvoyer = (
                        <li key={user._id}>
                          <img src={user.imageUrl} alt="user-pic" />
                          <h4>{user.name}</h4>
                          <div className="follow-handler">
                          <FollowHandler  idToFollow={user._id} type={"suggestion"}/>
                          </div>
                        </li>
                      );
                    }
                  }
                  return renvoyer;
                })}
              </ul>
            </div>
          </div>
        )}
        {followersPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnés</h3>
              <span className="cross" onClick={() => setfollowersPopup(false)}>
                &#10005;
              </span>
              <ul>
                {usersData.map((user) => {
                  let renvoyer;
                  for (let i = 0; i < userData.followers.length; i++) {
                    if (user._id === userData.followers[i]) {
                      renvoyer = (
                        <li key={user._id}>
                          <img src={user.imageUrl} alt="user-pic" />
                          <h4>{user.name}</h4>
                          <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} type={"suggestion"}/>
                          </div>
                        </li>
                      );
                    }
                  }
                  return renvoyer;
                })}
              </ul>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Profil;
