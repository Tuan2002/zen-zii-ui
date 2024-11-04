import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../LoginPage/Footer/Footer";
import "./Not.css";

const NotFound = () => {
    return (
        <div className="Not_container">
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div style={{margin:"2rem", fontWeight:"bold", fontSize:"1.5rem"}}>Xin lỗi, hiện tại trang này không khả dụng</div>
                <div>Trang bạn vừa truy cập có thể bị hỏng, hoặc trang này đã bị gỡ bỏ!<a href="/">Quay về trang chủ</a> </div>
            </div>
            <div className="footer">
                <Footer/>
            </div>
            <Outlet/>
        </div>
    );
};

export default NotFound;