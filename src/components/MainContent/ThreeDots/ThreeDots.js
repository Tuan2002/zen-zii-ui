import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkIsFollowing, followUser } from "../../../api";
import { allowScroll } from "../../../redux/scrollSlice";
import "./ThreeDots.css";

const ThreeDots = ({setThreeDots, setUnfollow, setDisplay}) => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {postInfo} = useSelector(state => state.post);
    const userInfo = useSelector(state => state.user)

    const [following, setFollowing] = useState(false);
    const [checkNeeded, setCheckNeeded] = useState(false);

    const check = async () => {
        console.log({followerId: userInfo.userId, followeeId:postInfo.userId})
        const res = await checkIsFollowing({followerId: userInfo.userId, followeeId:postInfo.userId})
        setFollowing(res.data)
    }


    useEffect(() => {
        if(userInfo){
            check();
        }
    },[userInfo.userId])


    return (
        <div className="threeDots_container" onClick={
            () => {
                setThreeDots(false)
                dispatch(allowScroll())
            }
        }>
            <div className="threeDots_main" onClick={event => event.stopPropagation()}>
                {/*<div onClick={() => {alert("This functionality has not been implemented yet.")}}>Report</div>*/}
                {following?
                    <div onClick={() => {
                        setThreeDots(false);
                        setUnfollow(true);
                    }}>Bỏ theo dỗi</div>
                    :
                    <div onClick={async () => {
                        await followUser({
                            followerId: userInfo.userId,
                            followeeId: postInfo.userId,
                            followTimestamp: new Date().toISOString()
                        })
                        setThreeDots(false)
                    }
                    }>Theo dõi</div>
                }


                <div onClick={() => {
                    setThreeDots(false);
                    // setDisplay(true);
                    // console.log(postInfo)
                    navigate(`/p/${postInfo.postId}`)
                    setDisplay(false)
                }}>Xem bài viết</div>
                {/*<div>Share to...</div>*/}
                <div onClick={async () => {
                    await navigator.clipboard.writeText(`${window.location.href}p/${postInfo.postId}`)
                    setThreeDots(false)
                    alert("Link copied to clipboard.")
                }}>Sao chép liên kết</div>
                {/*<div>Embed</div>*/}
                <div onClick={() => {
                    setThreeDots(false)
                }}>Hủy</div>
            </div>
        </div>
    );
};

export default ThreeDots;