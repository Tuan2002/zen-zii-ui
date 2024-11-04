import React from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./ThreeDotsSelf.css";

const ThreeDotsSelf = ({setThreeDotsSelf, setDeletePost, setDisplay, setEditPost}) => {

    const {postInfo} = useSelector(state => state.post);
    const navigate = useNavigate();

    return (
        <div className="threeDotsSelf_container" onClick={() => setThreeDotsSelf(false)}>
            <div className="threeDotsSelf_main" onClick={(e) => e.stopPropagation()}>
                <div onClick={() => {
                    setDeletePost(true);
                    setThreeDotsSelf(false);
                }}>Xóa bài viết</div>
                <div onClick={() => {
                    setThreeDotsSelf(false);
                    setEditPost(true)
                }}>Chỉnh sửa bài viết</div>
                {/*<div>Hide like count</div>*/}
                {/*<div>Turn off commenting</div>*/}
                <div onClick={() => {
                    setThreeDotsSelf(false)
                    setDisplay(false)
                    navigate(`/p/${postInfo.postId}`)
                }}>Xem bài viết</div>
                {/*<div>Share to...</div>*/}
                <div onClick={async () => {
                    console.log(`${window.location.href.slice(0, window.location.href.lastIndexOf('/'))}/p/${postInfo.postId}`)
                    await navigator.clipboard.writeText(`${window.location.href.slice(0, window.location.href.lastIndexOf('/'))}/p/${postInfo.postId}`)
                    setThreeDotsSelf(false)
                    alert("Link copied to clipboard.")
                }}>Sao chép liên kết</div>
                {/*<div>Embed</div>*/}
                <div>Hủy</div>
            </div>
        </div>
    );
};

export default ThreeDotsSelf;