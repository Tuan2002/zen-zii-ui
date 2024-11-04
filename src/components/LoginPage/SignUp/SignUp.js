import Button from "@mui/material/Button";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Divider from "../Divider/Divider";
import appleStore from "../images/appleStore.png";
import googlePlay from "../images/googlePlay.png";
import insLogo from "../images/ins_logo.png";
import "./SignUp.css";

import { BsCheckCircle } from "react-icons/bs";
import { checkEmail, checkUserName, signUp } from "../../../api";
import CustomInput from "../CustomInput/CustomInput";
import Footer from "../Footer/Footer";


const SignUp = () => {


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token !== null) navigate("/")
    })


    const [signUpInfo, setSignUpInfo] = useState({
        email:'',
        fullName:'',
        userName:'',
        password:''
    });

    const [signUpValidate, setSignUpValidate] = useState({
        email:false,
        fullName:false,
        userName:false,
        password:false
    });


    const [emailWarning, setEmailWarning] = useState('')
    const [usernameWarning, setUsernameWarning] = useState('')
    const [passwordWarning, setPasswordWarning] = useState('')
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [redirectNow, setRedirectNow] = useState(false)

    const canSubmit = signUpInfo.email !== '' &&
            signUpInfo.fullName !== '' &&
            signUpInfo.userName !== '' &&
            signUpInfo.password !== '' &&
            signUpValidate.email === true &&
            signUpValidate.fullName === true &&
            signUpValidate.userName === true &&
            signUpValidate.password === true

    const handleSubmit = async () => {

        try {
            const response = await signUp(signUpInfo)
            if(response.data) {
                setSignUpSuccess(true)
                // localStorage.setItem('token', response.data);

                setTimeout(()=>{
                    console.log("this is timeout")
                    navigate("../../")
                },6000)

            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="signUpPage_main">
                <div className="cardMain">
                    {!signUpSuccess ?
                        <div className="upperCardSignUp">
                            <img src={insLogo} className="insLogo"/>
                            <div className="des">Đăng ký tài khoản để chia sẻ các khoảnh khắc đẹp với người thân và bạn bè</div>
                            <div style={{marginBottom:"0.7rem", fontSize:"0.9rem"}}>
                                <Divider text="HOẶC"/>
                            </div>
                            <CustomInput
                                placeholder={"Địa chỉ e-mail"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"email"}
                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={async (value) => {
                                    if(value.length > 0){
                                        if(!value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        )){
                                            setSignUpValidate({...signUpValidate, email:false})
                                            setEmailWarning('Địa chỉ e-mail không hợp lệ')
                                        }
                                        else{
                                            const response = await checkEmail(value)
                                            if (response.data === false) setEmailWarning('Địa chỉ e-mail đã được sử dụng')
                                            setSignUpValidate({...signUpValidate, email:response.data})
                                        }
                                    }
                                }}


                            />
                            <CustomInput
                                placeholder={"Tên đầy đủ"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"fullName"}

                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={(value) => {
                                    setSignUpValidate({...signUpValidate, fullName:value.length > 0})
                                }}
                            />
                            <CustomInput
                                placeholder={"Tên đăng nhập"}
                                setSignUpInfo={setSignUpInfo}
                                signUpInfo={signUpInfo}
                                SignUpKey={"userName"}

                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={async (value) => {
                                    if(value.length > 0){
                                        const response = await checkUserName(value)
                                        if(response.data === false) setUsernameWarning('Tên đăng nhập đã được sử dụng')
                                        setSignUpValidate({...signUpValidate, userName:response.data})
                                    }
                                }}
                            />
                            <CustomInput
                                placeholder={"Mật khẩu"}
                                confidential={true}
                                signUpInfo={signUpInfo}
                                setSignUpInfo={setSignUpInfo}
                                SignUpKey={"password"}

                                signUpValidate={signUpValidate}
                                setSignUpValidate={setSignUpValidate}

                                validation={(value) => {
                                    if(value.length < 8) setPasswordWarning('Mật khẩu phải chứa ít nhất 8 ký tự')
                                    setSignUpValidate({...signUpValidate, password:value.length >= 8})
                                }}
                            />
                            <div className="des2">Khi đăng ký, bạn đã đồng ý với <a href="https://www.facebook.com/privacy/policy" target="_blank">Diều khoản, Chính sách quyền riêng tư</a> và <a href="https://help.instagram.com/1896641480634370?ref=ig">Chính sách về Cookies</a></div>
                            <Button variant="contained" id="loginButton" size="small" disabled={!canSubmit}
                                    onClick={handleSubmit}>Đăng ký</Button>

                            <div className="warning">
                                <div style={{display:`${signUpInfo.email.length > 0 && !signUpValidate.email ? 'block' :'none'}`}}>{emailWarning}</div>
                                <div style={{display:`${signUpInfo.userName.length > 0 && !signUpValidate.userName? 'block' :'none'}`}}>{usernameWarning}</div>
                                <div style={{display:`${signUpInfo.password.length > 0 && !signUpValidate.password? 'block' :'none'}`}}>{passwordWarning}</div>
                            </div>


                        </div>:

                        <div className="upperCardSignUp">
                            <img src={insLogo} className="insLogo"/>
                            <div style={{fontSize:"5rem"}}>
                                <BsCheckCircle/>
                            </div>
                            {/*{redirectNow? <Navigate to={"../../" } /> : <div style={{margin:"1rem"}}>Success</div>}*/}
                            <div style={{margin:"1rem"}}>Đăng ký thành công!</div>
                        </div>
                    }
                    <div className="bottomCardSignUp">
                        <div>Bạn đã có tài khoản? <a style={{color:"rgb(119,178,242)"}} href="/">Đăng nhập</a></div>
                    </div>
                    <div className="appDownload">
                        <div className="getTheApp">Tải ứng dụng cho thiết bị di động</div>
                        <div className="downloadImages">
                            <a href="https://apps.apple.com/app/instagram/id389801252?vt=lo" target="_blank"><img src={appleStore} className="downloadImageApple"/></a>
                            <a href="https://play.google.com/store/apps/details?id=com.instagram.android" target="_blank"><img src={googlePlay} className="downloadImageGoogle"/></a>
                        </div>
                    </div>
                </div>

            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>

    );
};

export default SignUp;