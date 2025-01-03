import React, { useEffect, useState } from 'react';
import "../MainContent/PostCard/PostCard.css";
import "./Display.css";

import { Avatar } from "@mui/material";
import { AiOutlineLeft, AiOutlineRight, AiOutlineSmile } from "react-icons/ai";
import { BsChat, BsHeart, BsHeartFill, BsThreeDots } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { useSelector } from "react-redux";

import Picker from 'emoji-picker-react';

import moment from 'moment';


import { useNavigate } from "react-router-dom";
import {
    checkIsLiked,
    checkIsSaved,
    comment,
    fetchCommentsByPostId,
    getLikesByPostId,
    likePost, savePost,
    unlikePost,
    unSavePost
} from "../../api";

const Display = ({setDisplay, setThreeDots, setThreeDotsSelf}) => {
    const userInfo = useSelector(state => state.user);
    const {postInfo} = useSelector(state => state.post);
    const [commentInput, setCommentInput] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const [comments, setComments] = useState([]);

    const [liked, setLiked] = useState(false);
    const [allLikes, setAllLikes] = useState([]);

    const [saved, setSaved] = useState(false);

    const navigate = useNavigate();

    const fetchComments = async ()=>{
        if(postInfo.postId){
            const res = await fetchCommentsByPostId(postInfo.postId)
            setComments(res.data)
        }
    }

    const fetchLikes = async ()=>{
        if(postInfo.postId){
            const res = await getLikesByPostId(postInfo.postId)
            setAllLikes(res.data)
        }
    }

    const checkLikeAndSave = async () => {
        if(postInfo.postId){
            const res = await checkIsLiked({userId: userInfo.userId, postId: postInfo.postId});
            const res2 = await checkIsSaved({userId: userInfo.userId, postId: postInfo.postId});
            setLiked(res.data);
            setSaved(res2.data);
        }
    }

    useEffect(() => {
        fetchComments();
        fetchLikes();
    },[])

    useEffect(() => {
        checkLikeAndSave();
    },[postInfo, liked, saved, allLikes])


    const showOtherLikes = () => {
        const len = allLikes.length;
        if (len === 0) return <div/>;
        else if(len === 1) return (
            <div className="postCard_like">
                <Avatar src={allLikes[0].userAvatar} sx={{width:"1.2rem", height: "1.2rem"}}/>&nbsp;
                <span><b>{allLikes[0].userName}</b> đã thích bài viết này</span>
            </div>
        )
        else {
            const rd = Math.floor(Math.random() * len);
            return (
                <div className="postCard_like">
                    <Avatar src={allLikes[0].userAvatar} sx={{width:"1.2rem", height: "1.2rem"}}/>&nbsp;
                    <span><b>{allLikes[0].userName}</b> và <b>nhiều người khác</b> đã thích bài viết này</span>
                </div>
            )
        }

    }

    return (
        <div className="display_container" onClick={() => {
            setDisplay(false)
        }}>

            <div className="display_close"><GrClose/></div>

            <div className="display_nav" onClick={(e) => {
                e.stopPropagation();
            }}>
                <AiOutlineLeft/>
            </div>

            <div className="display_card" onClick={(e) => {
                e.stopPropagation();
            }}>

                <div className="display_card_left">
                    <img src={postInfo.imageUrl} width="100%"/>
                </div>

                <div className="display_card_right">
                    <div className="display_card_right_up">
                        <div className="postCard_header">
                            <div className="postCard_names">
                                <Avatar sx={{height:"35px", width:"35px"}} src={postInfo.avatar}/>
                                <span style={{marginLeft:"0.2rem"}}>
                                <div style={{fontSize:"16px", fontWeight:"bold"}}>{postInfo.userName}</div>
                                <div style={{fontSize:"12px"}}>{postInfo.postLocation || 'Vị trí không xác định'}</div>
                            </span>
                            </div>
                            <BsThreeDots className="postCard_threeDots" style={{fontSize:"1.2rem"}} onClick={() => {
                                if(userInfo. userId === postInfo.userId) setThreeDotsSelf(true)
                                else setThreeDots(true)
                            }}/>
                        </div>
                        <hr/>
                    </div>

                    <div className="display_card_right_middle">
                        {postInfo.postCaption !== null && postInfo.postCaption !== ''?
                            <div className="display_comment">
                                <Avatar sx={{height:"35px", width:"35px"}} src={postInfo.userAvatar}/>
                                <div>
                                    <div className="display_all">

                                        <div style={{fontSize:"0.9rem"}}><b>{postInfo.userName}</b>&nbsp;{postInfo.postCaption}</div>
                                        <div className="display_reply">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div/>
                        }


                        {(postInfo.postCaption === null || postInfo.postCaption === '') && comments.length === 0 ?
                            <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100%"}}>
                                <div style={{fontSize:"1.4rem", fontWeight:"bold"}}>Chưa có bình luận nào</div>
                                <div style={{fontSize:"0.9rem"}}>Bắt đầu cuộc thảo luận</div>
                            </div>
                            :
                            <div/>
                        }

                        {comments.map((comment, index) => (
                            <div className="display_comment" key={index}>
                                <Avatar sx={{height:"35px", width:"35px"}} src={comment.commenterAvatar}/>
                                <div>
                                    <div className="display_all">
                                        <div style={{fontSize:"0.9rem"}}><b>{comment.commenterName}</b>&nbsp;{comment.commentContent}</div>
                                        <div className="display_reply">
                                            <div>{moment(new Date(comment.commentTimestamp)).fromNow()}</div>
                                        </div>
                                    </div>
                                </div>
                                {/*<BsHeart style={{fontSize:"0.8rem", marginTop:"0.8rem", width:"60px"}}/>*/}
                            </div>)
                        )}




                    </div>


                    <div className="display_card_right_down">
                        <hr/>
                        <div className="postCard_icon">

                            <div className="postCard_iconLeft">
                                <div onClick={() => {
                                    setLiked(!liked);
                                }}>
                                    {liked?
                                        <div style={{color:"red"}} onClick={ async () => {
                                            const formData = {
                                                userId: userInfo.userId,
                                                postId: postInfo.postId,
                                            }
                                            await unlikePost(formData)
                                        }
                                        }><BsHeartFill/></div> : <div onClick={ async () => {
                                            const formData = {
                                                userId: userInfo.userId,
                                                userName: userInfo.userName,
                                                userAvatar: userInfo.avatar,
                                                postId: postInfo.postId,
                                                likeTimestamp: new Date().toISOString()
                                            }
                                            await likePost(formData)
                                        }}><BsHeart/></div>}
                                </div>
                                <BsChat onClick={() => {
                                    document.getElementById("textarea_id").focus()
                                }}/>

                                <IoPaperPlaneOutline onClick={() => {
                                    setDisplay(false)
                                    navigate("/direct")
                                }}/>
                            </div>

                            {/*<BsThreeDots style={{fontSize:"1.2rem", position:"absolute", left:"50%"}}/>*/}

                            <div className="save"
                                onClick={() => {
                                setSaved(!saved)
                            }}>
                                {saved?
                                    <div onClick={async () => {
                                        const formData = {
                                            userId: userInfo.userId,
                                            postId: postInfo.postId,
                                        }
                                        await unSavePost(formData)
                                    }
                                    }><RiBookmarkFill/></div> : <div onClick={async () => {
                                        const formData = {
                                            userId: userInfo.userId,
                                            postId: postInfo.postId,
                                            saveTimestamp: new Date().toISOString()
                                        }
                                        await savePost(formData)
                                    }}><RiBookmarkLine/></div>}
                            </div>


                        </div>


                        {showOtherLikes()}
                        <span style={{fontSize:"0.5rem", padding:"0 0.7rem 0.7rem 0.7rem", color:"rgb(158,158,158)",fontWeight:"bold"}}>{moment(new Date(postInfo.postDate)).fromNow()}</span>
                        <hr/>
                        <div className="postCard_comment">
                            <div className="postCard_commentEmoji">
                                <div style={{fontSize:"1.3rem"}}>
                                    <AiOutlineSmile onClick={(e) => {
                                        e.stopPropagation();
                                        setShowEmoji(!showEmoji);
                                    }}/>
                                </div>

                                <div style={{position:"absolute", transform:"translate(0, -70%)", display:`${showEmoji ? "block" :"none"}`, userSelect:"none"}}>
                                    <Picker onEmojiClick={(event, emojiObject) => {
                                        setCommentInput(commentInput => commentInput += emojiObject.emoji);
                                    }}/>
                                </div>

                                <div className="textarea_container">
                                    <textarea id={"textarea_id"} value={commentInput} placeholder="Viết bình luận..." className="postCard_commentInput" onChange={event => setCommentInput(event.target.value)}/>
                                </div>
                                 </div>
                            {
                                commentInput === ''?
                                    <button className="postCard_commentButtonCannotPost">ĐĂNG</button>
                                    :
                                    <button className="postCard_commentButtonCanPost" onClick={async () => {

                                        const postContent = {

                                            postId:postInfo.postId,
                                            commenterId:userInfo.userId,
                                            commenterName:userInfo.userName,
                                            commentContent:commentInput,
                                            commentTimestamp:new Date().toISOString(),
                                            commenterAvatar:userInfo.avatar
                                        }

                                        await comment(postContent);
                                        await fetchComments();

                                        setCommentInput("");
                                    }}>POST</button>
                            }
                        </div>
                    </div>




                </div>
            </div>

            <div className="display_nav" onClick={(e) => {
                e.stopPropagation();
            }}>
                <AiOutlineRight/>
            </div>

        </div>
    );
};

export default Display;