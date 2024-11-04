import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFolloweesById, getUserById } from "../../../api";
import "./FriendCard.css";

const FriendCard = () => {

    const userInfo = useSelector(state => state.user);
    const [friends, setFriends] = useState([]);

    const navigate = useNavigate();

    const getAllFriends = async () => {
        const res = await getFolloweesById(userInfo.userId);
        const users = []
        if(res.data.length > 0){
            for(let follower of res.data){
                const user = await getUserById(follower.followeeId);
                users.push(user.data)
            }
            setFriends(users)
        }
    }

    useEffect(() => {
        if(userInfo.userId > 0){
            getAllFriends()
        }
    }, [userInfo.userId])

    return (
        <div className="friendCard_container">
                <div className="friend-card-list" style={{display:"flex", overflow:"scroll"}}>
                    {friends.length === 0 ?
                        <div style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            width:"100%",
                            fontWeight:"bold"
                        }}>
                            Hiện tại bạn không theo dõi người dùng nào...
                        </div>
                        :
                        <>
                            {friends.map((friend, index) => (
                            <div className="friendCard_person" key={index} onClick={() => {
                                navigate(`/${friends[index].userName}`)
                            }}>
                                <Avatar sx={{width:"55px", height:"55px"}} src={friends[index].avatar}/>
                                <div className="friendCard_text">{friends[index].userName}</div>
                            </div>
                             ))}
                        </>
                    }

                </div>
        </div>
    );
};

export default FriendCard;