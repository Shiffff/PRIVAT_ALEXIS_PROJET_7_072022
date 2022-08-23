import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils/utils";
import axios from "axios";
import { setFollowUser, setUnFollowUser } from "../../feature/user.slice";


const FollowHandler = ({ idToFollow, type }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [isFollowed, setisFollowed] = useState(false);

  const handleFollow = () => {
    const addFollow = () => {
         axios ({
    method: "put",
    url: `${process.env.REACT_APP_API_ENDPOINT}/user/follow/${userData._id}`,
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    data: { idToFollow }
    })
    .then((res) =>{
        console.log(res.data)
        dispatch(setFollowUser(idToFollow))

    })
    .catch((err) => console.log('err'))
    };
    addFollow();
    setisFollowed(true)
  };
 

  const handleUnfollow = () => {
    const addUnFollow = () => {
      axios ({
 method: "put",
 url: `${process.env.REACT_APP_API_ENDPOINT}/user/unfollow/${userData._id}`,
 headers: {
  'Authorization': 'Bearer ' + localStorage.getItem('token')
},
 data: { idToFollow }
 })
 .then((res) =>{
     console.log(res.data)
     dispatch(setUnFollowUser(idToFollow))
 })
 .catch((err) => console.log('err'))
 };
 addUnFollow();
 setisFollowed(false)

};


  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setisFollowed(true);
      } else setisFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          { type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
          {type === "card" && <img className="followPost" src="../checked.svg" alt='icon logout'></img>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && <button className="follow-btn">Suivre</button>}
          {type === "card" && <img className="unfollowPost" src="../check.svg" alt='icon logout'></img>}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
