import Button from "@mui/material/Button";
import React from 'react';
import { useNavigate } from "react-router-dom";
import imgLogo from "../img.png";
import "../MessagePage.css";

const Inbox = () => {

    const navigate = useNavigate();

    return (
        <div className="messagePage_right2">
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <img src={imgLogo}/>
                <div style={{fontSize:"1.3rem"}}>Tin nhắn</div>
                <div style={{color:"rgb(154,154,154)", fontSize:"0.9rem", margin:"0.5rem 0"}}>Gửi tin nhắn cho bạn bè hoặc nhóm</div>
                <div style={{width:"60%", display:"flex", justifyContent:"center"}}>
                    <Button variant="contained"
                            id="loginButton"
                            size="small"
                            onClick={() => {navigate("/direct/new")}}
                    >Gửi tin nhắn</Button>
                </div>

            </div>
        </div>
    );
};

export default Inbox;