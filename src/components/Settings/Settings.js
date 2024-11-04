import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import "./Settings.css";

import * as htmlToImage from 'html-to-image';

import { useSelector } from "react-redux";
import { updateInSettings } from "../../api";
import cloudinaryUpload from "../../utilities/cloudinaryUpload";

const Settings = () => {

    const userInfo = useSelector(state => state.user)
    const [state, setState] = useState(0);
    const [avatar, setAvatar] = useState(null)
    const [updateInfo, setUpdateInfo] = useState({
        fullName:'',
        website: '',
        bio:'',
        avatar:'',
        phoneNumber:''
    });



    useEffect(() => {
        if(userInfo.userName){
            setAvatar(userInfo.avatar)
            setUpdateInfo({fullName: userInfo.fullName, website: userInfo.website, bio: userInfo.bio, avatar: userInfo.avatar, phoneNumber: userInfo.phoneNumber})
        }
    },[userInfo.userName])


    const imgParentRef = useRef(null);

    const hiddenFileInput = useRef(null);

    const handleChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]))
    }



    const handleClick = async (e) => {
        htmlToImage.toPng(imgParentRef.current).then(async function (dataUrl) {
            let location = '';
            try {
                const result = await cloudinaryUpload(dataUrl)
                location = result.secure_url
            } catch (error) {
                console.log(error)
            }
            const formData = {
                userName:userInfo.userName,
                avatar:location,
                fullName: updateInfo.fullName,
                bio: updateInfo.bio,
                website: updateInfo.website,
                phoneNumber: updateInfo.phoneNumber
            }

            console.log(formData)
            updateInSettings(formData).then((res) => {
                console.log(res)
                window.location.reload();
            })
        })
    }

    return (
        <div>
            <div style={{height:"calc(100vh - 60px)", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <div className="setting_ct">
                    <div className="setting_left">
                        <div className="setting_s" onClick={() => {setState(0)}} style={{fontWeight:`${state === 0 ? 'bold' : 'unset'}`}}>Cập nhật thông tin</div>
                        {/*<div className="setting_s" onClick={() => {setState(1)}} style={{fontWeight:`${state === 1 ? 'bold' : 'unset'}`}}>Change Password</div>*/}
                    </div>
                    <div className="setting_right">
                        <div className="setting_right_li">
                            <div className="setting_right_left" >
                                <Avatar style={{width:"45px", height:"45px"}} src={avatar} ref={imgParentRef}/>
                            </div>
                            <div className="setting_right_right">
                                <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>{userInfo.userName}</div>
                                <div style={{color:"rgb(66,148,239)", fontWeight:"600"}}
                                     className="change"
                                     onClick={() => {
                                         hiddenFileInput.current.click();
                                     }}
                                >Thay đổi ảnh đại diện</div>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Tên đầy đù</div>
                            <div className="setting_right_right">
                                <input value={updateInfo.fullName} onChange={e=>setUpdateInfo({...updateInfo, fullName: e.target.value})}/>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    Giúp mọi người biết bạn là ai. Tên này sẽ hiển thị trên hồ sơ của bạn và trên bài viết của bạn.
                                </div>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Tên đăng nhập</div>
                            <div className="setting_right_right">
                                <input
                                    value={userInfo.userName}
                                disabled/></div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    Bạn không thể thay đổi tên đăng nhập trên ứng dụng này
                                </div>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Mạng xã hội</div>
                            <div className="setting_right_right">
                                <input value={updateInfo.website} onChange={e=>setUpdateInfo({...updateInfo, website: e.target.value})}/>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left">Tiểu sử</div>
                            <div className="setting_right_right">
                                <textarea value={updateInfo.bio} onChange={e=>setUpdateInfo({...updateInfo, bio: e.target.value})}/>
                            </div>
                        </div>

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    {/*<div style={{transform:"translate(0, -0.8rem)"}}>1/150</div>*/}
                                    <div>
                                        <div style={{fontWeight:"bold"}}>Thông tin cá nhân</div>
                                        <div>
                                            Chia sẻ thông tin cá nhân của bạn, giúp mọi người biết bạn hơn
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="setting_right_li">
                            <div className="setting_right_left">Địa chỉ e-mail</div>
                            <div className="setting_right_right"><input value={userInfo.email} disabled/></div>
                        </div>



                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_text">
                                    Bạn không thể thay đổi địa chỉ e-mail trên ứng dụng này
                                </div>
                            </div>
                        </div>


                        <div className="setting_right_li">
                            <div className="setting_right_left">Số điện thoại</div>
                            <div className="setting_right_right">
                                <input value={updateInfo.phoneNumber} onChange={e=>setUpdateInfo({...updateInfo, phoneNumber: e.target.value})}/>
                            </div>
                        </div>

                        <input
                            type="file"
                            ref={hiddenFileInput}
                            style={{display: 'none'}}
                            onChange={handleChange}
                        />

                        <div className="setting_right_li">
                            <div className="setting_right_left"/>
                            <div className="setting_right_right">
                                <div className="setting_button" onClick={handleClick}>
                                    Lưu lại
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default Settings;