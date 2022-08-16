import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../../utils/utils';
import FollowHandler from '../profil/followHandler';
import LikeButton from './LikeButton';

const Card = ( { post } ) => {
    const [isLoading, setIsLoading] = useState(true)
    const userData = useSelector((state) => state.user.user);
    const usersData = useSelector((state) => state.users.users);

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData])

    return (
       <li className='card-container' key={post._id}>
            {isLoading ? (
                <div>Chargement</div>
            ) : (
                <>
                <div className='card-left'>
                    <img src={
                        !isEmpty(usersData[0]) && 
                            usersData.map((user) => {
                                if (user._id === post.posterId)
                                return user.imageUrl;
                                else return null
                            }).join(" ")
                            
                    } alt="profil pic" />
                </div>
                <div className='card-right'>
                    <div className='card-header'>
                        <div className='pseudo'>
                            <h3>
                            {!isEmpty(usersData[0]) && 
                            usersData.map((user) => {
                                if (user._id === post.posterId)
                                return user.name;
                                else return null
                            })
                        .join('')}
                            </h3>
                            {post.posterId !== userData._id && (
                            <FollowHandler idToFollow={post._id} type={"card"}/>
                            )}
                        </div>
                        <span className='datePost'>{dateParser(post.createdAt)}</span>
                    </div>
                    <p>{post.message}</p>
                    {post.picture && ( <img src={post.picture} alt="card-pic" className='card-pic' />
                    )}
                    <div className="card-footer">
                        <div className="comment-icon">
                        <img className="unfollowPost" src="../comment.svg" alt='icon logout'></img>
                        <span>{post.comments.lenght}</span>
                        </div>
                        <LikeButton post={post}/>
                    </div>
                </div>
                </>
            )}
       </li>
    );
};

export default Card;