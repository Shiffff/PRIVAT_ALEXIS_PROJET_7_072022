import React, { useState } from "react";
import UploadImg from "../components/profil/UploadImg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUpdateBio } from "../feature/user.slice";
import { dateParser } from "../utils/utils";

const Profil = () => {
  const dispatch = useDispatch();
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.user.user);

  const [followingPopup, setfollowingPopup] = useState(false);
  const [followersPopup, setfollowersPopup] = useState(false);


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
        <h1> Profil de {userData.name}</h1>
        <div className="uptdate-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={userData.imageUrl} alt="img de profil" />
            <UploadImg />
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.bio}
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier bio
                  </button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea
                    type="text"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>Valider modifications</button>
                </>
              )}
            </div>
            <h4>Membre depuis le: {dateParser(userData.createdAt)}</h4>
            <h5 onClick={() => setfollowingPopup(true)}>
              Abonnements :
              {userData.following ? userData.following.length : "0"}
            </h5>
            <h5 onClick={() => setfollowersPopup(true)}>
              Abonnés : {userData.followers ? userData.followers.length : "0"}
            </h5>
          </div>
        </div>
        {followingPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnements</h3>
              <span className="cross" onClick={() => setfollowingPopup(false)}>&#10005;
              </span>
              <ul>
                
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profil;
