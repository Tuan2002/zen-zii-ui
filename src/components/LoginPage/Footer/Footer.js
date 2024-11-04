import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <div style={{marginTop:"3rem"}}>
                <div className="allTags">
                <span className="tag">ZenZii</span>
                <span className="tag">Về chúng tôi</span>
                <span className="tag">Blog</span>
                <span className="tag">Tuyển dụng</span>
                <span className="tag">Trợ giúp</span>
                <span className="tag">Quyền riêng tư</span>
                <span className="tag">Điều khoản dịch vụ</span>
                </div>
                <div className="lineTwo">
                    <select id="selector">
                        <option value="en">English</option>
                        <option value="vi">Tiếng Việt</option>
                    </select>
                    <div>© 2024 ZenZii bởi Tuan Nguyen</div>
                </div>
        </div>

    );
};




export default Footer;