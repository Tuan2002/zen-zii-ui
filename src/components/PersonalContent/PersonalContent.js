import { Avatar, Container } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { BsGearWide } from "react-icons/bs";
import "./PersonalContent.css";

import { BsBookmarkStar, BsFileEarmarkPerson, BsGrid3X3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
    checkIsFollowing, createSession,
    followUser,
    getFolloweesById,
    getFollowersById,
    getPostsById,
    getSavedPostsByUserId,
    getUserByName
} from "../../api";

import { BsPersonCheckFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { checkUserName } from "../../api";
import NotFound from "../NotFound/NotFound";

import { v4 as uuidv4 } from 'uuid';


import PersonalPosts from "./PersonalPosts/PersonalPosts";


import { cancelUnfollow } from "../../redux/followSlice";
import { closeShowProfile, updateStateSimple } from "../../redux/navbarStatusSlice";
import { updatePostUser } from "../../redux/postSlice";



const PersonalContent = ({setDisplay, userName, display, setUnfollow}) => {

    const [tag, setTag] = useState(0);

    const location = useLocation();
    const {from, pathname} = location;


    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.user);

    const [otherUser, setOtherUser] = useState({});

    const [allPosts, setAllPosts] = useState([]);
    const [allSavedPosts, setAllSavedPosts] = useState([]);

    const [follow, setFollow] = useState(false);

    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    const [check, setCheck] = useState(true)
    
    const {userDidUnfollowed} = useSelector(state=>state.follow)


    useEffect(() => {
        console.log(userDidUnfollowed)
    },[userDidUnfollowed])


    /**
     * 0 self
     * 1 other user
     * 2 no such user in the database
     */
    const [userType, setUserType] = useState(0);

    useEffect(() => {
        dispatch(updateStateSimple('profile'));
        dispatch(closeShowProfile());
    },[])

    useEffect(() => {
        const checkUserNameAsync = async () => {
            if(userName.toLowerCase() === userInfo.userName.toLowerCase()) {
                setUserType(0);
                getPostsById(userInfo.userId).then((res)=>{
                    setAllPosts(res.data)
                })

                getSavedPostsByUserId(userInfo.userId).then((res)=>{
                    setAllSavedPosts(res.data)
                })


                getFollowersById(userInfo.userId).then(res => {
                    setFollowers(res.data.map(follower => follower.followerId))
                })

                getFolloweesById(userInfo.userId).then(res => {
                    setFollowings(res.data.map(followee => followee.followerId))
                })

            }
            else{
                const response = await checkUserName(userName)
                if(response.data === true) {
                    setUserType(2);
                }
                else {
                    setUserType(1);
                    const user = await getUserByName(userName)
                    setOtherUser(user.data)
                    const userId = user.data.userId
                    getPostsById(userId).then((res)=>{
                        setAllPosts(res.data)
                    })

                    getSavedPostsByUserId(userId).then((res)=>{
                        setAllSavedPosts(res.data)
                    })

                    getFollowersById(userId).then(res => {
                        setFollowers(res.data.map(follower => follower.followerId))
                    })

                    getFolloweesById(userId).then(res => {
                        setFollowings(res.data.map(followee => followee.followerId))
                    })

                    checkIsFollowing({followerId:userInfo.userId, followeeId:userId}).then((res) => {
                        setFollow(res.data)
                    })

                    dispatch(updatePostUser({...otherUser}));

                }
            }
        }
        if (userInfo.userName) checkUserNameAsync();
    },[userName, userInfo, follow, display, userDidUnfollowed])



    if(userType === 2) return <NotFound/>;

    return (
        <div style={{position:"relative"}}>
                <Container maxWidth="md">
                    <div className="personalContent_info">
                        <Avatar sx={{width:"135px", height:"135px"}} src={userType === 0 ? userInfo.avatar : otherUser.avatar}/>
                        <div className="personalContent_des">
                            <div className="personalContent_line1">
                                <div>{userName}</div>

                                {userType === 0 ?
                                    <div style={{display:"flex"}}>
                                        <div className="personalContent_button" onClick={() => {
                                            navigate("/accounts/edit")
                                        }}>Cập nhật</div>
                                        <BsGearWide className="personalContent_gear"/>
                                    </div>
                                    :
                                    <div style={{display:"flex"}}>
                                        <div className="personalContent_button" onClick={async () => {
                                            const uuId = uuidv4();
                                            const formData = {
                                                sessionId:uuId,
                                                userAId:userInfo.userId,
                                                userAName:userInfo.userName,
                                                userAAvatar:userInfo.avatar,
                                                userBId:otherUser.userId,
                                                userBName:otherUser.userName,
                                                userBAvatar:otherUser.avatar,
                                                sessionTimestamp:new Date().toISOString(),
                                            }
                                            await createSession(formData);
                                            navigate(`/direct/t/${uuId}`)
                                        }
                                        }>Message</div>
                                        {
                                            follow === false ?
                                                <div className="personalContent_button2" onClick={async () => {
                                                    setFollow(true)
                                                    const formData = {
                                                        followerId: userInfo.userId,
                                                        followeeId: otherUser.userId,
                                                        followTimestamp: new Date().toISOString()
                                                    }
                                                    await followUser(formData);
                                                    dispatch(cancelUnfollow())
                                                }
                                                }>Follow</div>
                                                :
                                                <div className="personalContent_button"
                                                     onClick={async () => {
                                                         setUnfollow(true)
                                                     }
                                                }>
                                                    <div style={{transform:"translate(0, 4px) scale(1.5)"}}>
                                                        <BsPersonCheckFill/>
                                                    </div>
                                                </div>
                                        }
                                        <div className="personalContent_dot">
                                            <HiOutlineDotsHorizontal/>
                                        </div>
                                    </div>
                                }

                            </div>
                            <div className="personalContent_line2">
                                <div><b>{allPosts.length}</b> Bài viết</div>
                                <div><b>{followers.length}</b> Người theo dõi</div>
                                <div><b>{followings.length}</b> Đang theo dõi</div>
                            </div>
                            <div className="personalContent_line3">{userType === 0 ? userInfo.fullName : otherUser.fullName}</div>
                        </div>
                    </div>

                    <div className="personalContent_selectionTool">
                        <hr className="personalContent_divider"/>
                        <div className="personalContent_selection">
                            <div className={"personalContent_tag".concat(tag === 0 ? " selected":"")} onClick={() => {
                                setTag(0);
                                navigate(`/${userName}`)

                            }}>
                                <BsGrid3X3/>&nbsp;&nbsp;
                                <div>BÀI VIẾT</div>
                            </div>
                            <div className={"personalContent_tag".concat(tag === 1 ? " selected":"")} onClick={() => {
                                setTag(1);
                                navigate(`/${userName}/saved`)

                            }}>
                                <BsBookmarkStar/>&nbsp;&nbsp;
                                <div>ĐÃ LƯU</div>
                            </div>
                            {userType === 0 ?
                                <div className={"personalContent_tag".concat(tag === 2 ? " selected":"")} onClick={() => {
                                    setTag(2);
                                    navigate(`/${userName}/tagged`)
                                }}>
                                    <BsFileEarmarkPerson/>&nbsp;&nbsp;
                                    <div>ĐƯỢC GẮN THẺ</div>
                                </div>
                                :
                                <div/>
                            }

                        </div>
                    </div>

                    <Routes>
                        <Route path="/" element={<PersonalPosts allPosts={allPosts} setDisplay={setDisplay} userType={userType} userInfo={userInfo} otherUser={otherUser}/>}/>
                        <Route path="/saved" element={<PersonalPosts allPosts={allSavedPosts} setDisplay={setDisplay} userType={userType} userInfo={userInfo} otherUser={otherUser}/>}/>
                        <Route path="/tagged" element={<div/>}/>
                    </Routes>
                </Container>
            </div>


    );
};

export default PersonalContent;