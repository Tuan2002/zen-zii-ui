import React from 'react';
import "./MainFooter.css";

const MainFooter = () => {
    return (
        <div className="mainFooter_container">
            <div className="mainFooter_detail">
                <div>Về chúng tôi</div>
                <div>Trợ giúp</div>
                <div>Quyền riêng tư</div>
                <div>Điều khoản</div>
                <div>Ngôn ngữ</div>
            </div>
            <div>
                © 2024 ZenZii bởi Tuấn Nguyễn
            </div>
        </div>
    );
};

export default MainFooter;