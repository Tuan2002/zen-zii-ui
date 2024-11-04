import React from 'react';
import { useSelector } from "react-redux";
import { deletePost } from "../../../api";
import "./DeletePost.css";


const DeletePost = ({setDeletePost}) => {


    const {postInfo} = useSelector(state => state.post)


    return (
        <div className="delete_container" onClick={()=>{setDeletePost(false)}}>
            <div className="delete_main" onClick={(event)=>{event.stopPropagation()}}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    padding:"2rem",
                    gap:"0.5rem"
                }}>
                    <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>Bạn muốn xóa bài viết này?</div>
                    <div style={{color:"rgb(143,143,143)"}}>Bạn có chắc chắn muốn xóa bài viết này không?</div>
                </div>
                <div className="delete_selections">
                    <div onClick={async () => {
                        await deletePost(postInfo.postId)
                        setDeletePost(false)
                        window.location.reload();
                    }}>Xóa</div>
                    <div onClick={() => {
                        setDeletePost(false);
                    }}>Hủy</div>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;