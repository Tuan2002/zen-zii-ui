import Button from '@mui/material/Button';
import React, { useState } from 'react';
import insLogo from "./images/ins_logo.png";

import useWindowDimensions from "../../utilities/useWindowDimension";
import Divider from "./Divider/Divider";
import Footer from "./Footer/Footer";

import { useNavigate } from "react-router-dom";
import { logIn } from "../../api";
import CustomInput from "./CustomInput/CustomInput";
import "./LoginPage.css";
import PhonePicture from "./PhonePicture/PhonePicture";


const LoginPage = () => {

    const { width } = useWindowDimensions();

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        email:'',
        password:''
    });

    const [loginDefault, setLoginDefault] = useState({
        email:'',
        password:''
    })



    const [errMsg, setErrMsg] = useState('')

    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        setErrMsg('')
        try {
            const response = await logIn({...loginInfo, lastLogin:new Date().toISOString()});

            if(response.data === "NO_SUCH_ACCOUNT") setErrMsg("Thông tin tài khoản hoặc mật khẩu không chính xác.")
            else if(response.data === "WRONG PASSWORD") setErrMsg("Thông tin tài khoản hoặc mật khẩu không chính xác.")
            else {
                localStorage.setItem('token', response.data);
                window.location.reload();
            }
        }catch (e){
            console.log(e)
        }
    }

    return (
        <div>
            <div className="loginPage_main">
                {
                    width < 720 ?  <div/> : <PhonePicture/>
                }
                <div className="cardMain">
                    <div className="upperCard">
                        <img src={insLogo} className="insLogo"/>
                        <CustomInput
                            placeholder={"Tên người dùng hoặc e-mail"}
                            setSignUpInfo={setLoginInfo}
                            signUpInfo={loginInfo}
                            SignUpKey={"email"}
                            signUpValidate={null}
                            defaultValue={loginDefault['email']}
                        />

                        <CustomInput
                            placeholder={"Mật khẩu"}
                            confidential={true}
                            setSignUpInfo={setLoginInfo}
                            signUpInfo={loginInfo}
                            SignUpKey={"password"}
                            signUpValidate={null}
                            defaultValue={loginDefault['password']}
                        />

                        <Button variant="contained"
                                id="loginButton"
                                size="small"
                                disabled={loginInfo.email.length === 0 || loginInfo.password.length === 0 }
                                onClick={handleSubmit}
                        >Đăng nhập</Button>
                        <Divider text="HOẶC"/>

                        <div className="err_msg" style={{width:"80%", fontSize:"0.9rem", color:"red", textAlign:"center", padding:"1rem"}}>
                            {errMsg}
                        </div>

                        <div className="forgetPassword">
                            <a href="/">Quên mật khẩu?</a>
                        </div>
                    </div>
                    <div className="bottomCard">
                        <div>Bạn chưa có tài khoản? <a style={{color:"rgb(119,178,242)"}} href="/accounts/emailsignup">Đăng ký</a></div>
                    </div>
                    <div className="appDownload">
                        <div className="getTheApp">Tải ứng dụng cho thiết bị di động</div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Footer/>
            </div>

        </div>
    );
};

export default LoginPage;
