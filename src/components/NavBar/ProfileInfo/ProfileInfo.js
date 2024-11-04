import React from 'react';
import { BsBookmark, BsGearWide } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { HiSwitchHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeShowProfile, updateStateSimple } from "../../../redux/navbarStatusSlice";
import "./ProfileInfo.css";

const ProfileInfo = ({setSwitchAccount}) => {

    const {navbarStatus, navbarCache} = useSelector(state => state.navbarStatus);

    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.user);

    const userName = userInfo.userName;

    const navigate = useNavigate();

    const handleClick = (name) => {
        return () => {
            if(name === 'Profile') {
                navigate(`/${userName}`);
                dispatch(updateStateSimple('profile'));
                dispatch(closeShowProfile());
            }
            else if(name === 'Saved') navigate(`/${userName}/saved`);
            else if(name === 'Settings') navigate(`/accounts/edit`);
            else if(name === 'Logout') {
                localStorage.clear();
                window.location.href = '/';
            }
            else {
                setSwitchAccount(true);
            }
        }
    }

    return (
        <div className="profileInfo_container" onClick={e=>e.nativeEvent.stopImmediatePropagation()}>
            <ul className="profileInfo_ul">
                <li className="profileInfo_li" onClick={handleClick("Profile")}>
                    <FaRegUserCircle/>
                    <span className="profileInfo_1">Hồ sơ người dùng</span>
                </li>
                <li  className="profileInfo_li"onClick={handleClick("Saved")}>
                    <BsBookmark/>
                    <span className="profileInfo_1">Đã lưu</span>
                </li>
                <li  className="profileInfo_li" onClick={handleClick("Settings")}>
                    <BsGearWide/>
                    <span className="profileInfo_1">Cài đặt tài khoản</span>
                </li>
                <li className="profileInfo_li" onClick={handleClick("Switch")}>
                    <HiSwitchHorizontal/>
                    <span style={{display:"inline"}} className="profileInfo_1">Đổi tài khoản</span>
                </li>
                <hr/>
                <li className="profileInfo_li" onClick={handleClick("Logout")}>
                    Đăng xuất
                </li>
            </ul>
        </div>
    );
};

export default ProfileInfo;