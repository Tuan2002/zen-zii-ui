import { Avatar } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { navigation, updatePost } from "../../../api";
import "./EditPost.css";

const EditPost = ({setEditPost}) => {

    const {postInfo} = useSelector(state => state.post)
    const [disableLocation, setDisableLocation] = useState(false)
    const [locationContent, setLocationContent] = useState('')
    const [timer, setTimer] = useState(0);
    const [locationFocus, setLocationFocus] = useState(false)
    const [locationResult, setLocationResult] = useState([]);
    const [accessOpen, setAccessOpen] = useState(false);
    const [accessContent, setAccessContent] = useState('');

    const [captionContent, setCaptionContent] = useState('')

    useEffect(()=>{
        if(locationFocus && locationContent.length >= 3){
            const temp = setInterval(() => {
                setTimer(timer => timer + 1)
            },1000)
            return () => clearInterval(temp);
        }
    })

    useEffect(()=>{
        if(timer === 2){
            navigation(locationContent).then(data=>{
                setLocationResult(data.data.features.map(feature => feature.place_name))
            }).catch(error => console.log(error))
        }
    },[timer])

    useEffect(() => {
        if(postInfo){
            setCaptionContent(postInfo.postCaption)
            setAccessContent(postInfo.postAlt)
            // setLocationContent(postInfo.postLocation)
        }
    },[postInfo])

    const handleEditSubmit = async () => {
        const formData = {
            postId: postInfo.postId,
            postLocation: locationContent,
            postCaption: captionContent,
            postAlt: accessContent
        }

        await updatePost(formData);
        // alert("Update success.");
        window.location.reload();
    }


    return (
        <div className="editPost_ct" onClick={() => {setEditPost(false)}}>
            <div className="editPost_main" onClick={e=>e.stopPropagation()}>
                <div className="editPost_title" >
                    <span style={{fontSize:"0.9rem"}} onClick={() => setEditPost(false)}>Hủy</span>
                    <span style={{fontWeight:"bold"}}>Thay đổi thông tin</span>
                    <span style={{fontSize:"0.9rem", color:"rgb(65,147,239)", fontWeight:"700"}} onClick={handleEditSubmit}>Done</span>
                </div>
                <div className="editPost_body">
                    <div className="editPost_bodyLeft">
                        <img src={postInfo.imageUrl} width="100%"/>
                    </div>
                    <div className="editPost_bodyRight">
                        <div className="newPost_editPhoto_caption" style={{width:"100%"}}>
                            <div className="newPost_captionContainer">
                                <div className="newPost_avatar">
                                    <Avatar sx={{width:"30px", height:"30px"}} src={postInfo.avatar}/>
                                    <div><b>{postInfo.userName}</b></div>
                                </div>

                                <textarea
                                    placeholder="Hôm nay bạn cảm thấy thế nào?"
                                    value={captionContent}
                                    onChange={e=>setCaptionContent(e.target.value)}
                                />


                            </div>
                            <div className="newPost_location">
                                {
                                    disableLocation?
                                        <div className="newPost_locationDisabled">
                                            {locationContent}
                                        </div>
                                        :
                                        <input
                                            className="newPost_inputA"
                                            placeholder="Thêm vị trí"
                                            type="text"
                                            value={locationContent}
                                            onChange={e => {
                                                setLocationContent(e.target.value);
                                                setTimer(0);
                                            }}
                                            onFocus={() => setLocationFocus(true)}
                                            onBlur={() =>{
                                                setLocationFocus(false);
                                                setTimer(0);
                                            }}

                                        />
                                }
                                <div className="GoLocation">
                                    {locationContent.length !== 0 ?
                                        <GrClose onClick={() => {
                                            setLocationContent('');
                                            setDisableLocation(false)
                                        }}/>
                                        :
                                        <GoLocation/>
                                    }
                                </div>
                            </div>

                            <div className="newPost_remain">
                                {locationContent !== '' && disableLocation === false ?
                                    <div className="editPost_searchResults">
                                        <ul className="newPost_location_ul">
                                            {
                                                locationResult.map(
                                                    (result, index) =>
                                                        <li
                                                            className="newPost_location_li"
                                                            key={index}
                                                            onClick={() => {
                                                                setLocationContent(locationResult[index]);
                                                                setDisableLocation(true)
                                                            }}
                                                        >
                                                            {result}
                                                        </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    :
                                    <div/>
                                }
                            </div>

                            <div className="newPost_access" style={{display:`${locationContent !== '' && disableLocation === false ? 'none':'block'}`}}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <div style={{fontWeight:`${accessOpen? 'bold':'unset'}`}}>Khả năng truy cập</div>
                                    <div
                                        className="newPost_up_and_down"
                                        onClick={() => setAccessOpen(!accessOpen)}
                                    >{accessOpen?<BsChevronUp/>:<BsChevronDown/>}</div>
                                </div>

                                <div style={{display:`${accessOpen ? 'block':'none'}`}}>
                                    <div style={{margin:"0.8rem 0", fontSize:"0.8rem", color:"rgb(143,143,143)"}}>
                                        Văn bản giúp người khiếm thị có thể truy cập nội dung của bạn, hãy thêm mô tả cho ảnh của bạn
                                    </div>
                                    <div style={{display:"flex", alignItems:"center"}}>
                                        <img src={postInfo.imageUrl} width="40px" height="40px"/>&nbsp;&nbsp;
                                        <input type="text"
                                               className="newPost_inputB"
                                               placeholder="Hãy thêm mô tả cho ảnh của bạn"
                                               value={accessContent}
                                               onChange={e=>setAccessContent(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;