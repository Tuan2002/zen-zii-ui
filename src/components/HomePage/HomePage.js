import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getUserByName } from "../../api";
import { update } from "../../redux/userSlice";
import Display from "../Display/Display";
import DisplayNewPage from "../DisplayNewPage/DisplayNewPage";
import Explore from "../Explore/Explore";
import DeletePost from "../MainContent/DeletePost/DeletePost";
import EditPost from "../MainContent/EditPost/EditPost";
import MainContent from "../MainContent/MainContent";
import SeeAll from "../MainContent/SeeAll/SeeAll";
import SwitchAccounts from "../MainContent/SwitchAccounts/SwitchAccounts";
import ThreeDots from "../MainContent/ThreeDots/ThreeDots";
import ThreeDotsSelf from "../MainContent/ThreeDotsSelf/ThreeDotsSelf";
import UnFollow from "../MainContent/UnFollow/UnFollow";
import MessagePage from "../MessagePage/MessagePage";
import NavBar from "../NavBar/NavBar";
import NewPost from "../NewPost/NewPost";
import PersonalPage from "../PersonalPage/PersonalPage";
import Settings from "../Settings/Settings";
import "./HomePage.css";

const HomePage = () => {

    const {canScroll} = useSelector(state => state.scroll)

    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    useEffect(() => {
            const {username} = jwt_decode(token);
            const userInfo = getUserByName(username)
            userInfo.then((res)=>{
                dispatch(update(res.data))
            })

    },[])

    const {navbarStatus} = useSelector(state => state.navbarStatus);
    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState(false);
    const [switchAccount, setSwitchAccount] = useState(false);

    const [threeDots, setThreeDots] = useState(false);
    const [threeDotsSelf, setThreeDotsSelf] = useState(false);
    const [unfollow, setUnfollow] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [editPost, setEditPost] = useState(false);

    useEffect(() => {
        document.addEventListener("click", () => {
            setOpen(false);
        });
    },[])

    const [scrollPosition, setScrollPosition] = useState(0);

    const [friendsSuggestion, setFriendsSuggestion] = useState([]);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="home" style={{
            // position:"relative",
        }}>
            {navbarStatus.newPost ?
                <div style={{position:"absolute",width:"100%", zIndex:15, top:`${scrollPosition}px`}}>
                    <NewPost/>
                </div>
                :
                <div/>
            }

            {display ?
                <div style={{position:"absolute",width:"100%", zIndex:15, top:`${scrollPosition}px`}}>
                    <Display display={display} setDisplay={setDisplay} setThreeDots={setThreeDots} setThreeDotsSelf={setThreeDotsSelf}/>
                </div>
                :
                <div/>
            }

            {switchAccount ?
                <div style={{position:"absolute",width:"100%", zIndex:15, top:`${scrollPosition}px`}}>
                    <SwitchAccounts switchAccount={switchAccount} setSwitchAccount={setSwitchAccount}/>
                </div>
                :
                <div/>
            }

            {threeDots ?
                // <div style={{position:"absolute",width:"100%", zIndex:25, transform:`translate(0, ${scrollPosition}px)`}}>
                <div style={{position:"absolute",width:"100%", zIndex:25, top:`${scrollPosition}px`}}>
                    <ThreeDots setThreeDots={setThreeDots} setUnfollow={setUnfollow} setDisplay={setDisplay}/>
                </div>
                :
                <div/>
            }

            {threeDotsSelf ?
                // <div style={{position:"absolute",width:"100%", zIndex:25, transform:`translate(0, ${scrollPosition}px)`}}>
                <div style={{position:"absolute",width:"100%", zIndex:25, top:`${scrollPosition}px`}}>
                    <ThreeDotsSelf setThreeDotsSelf={setThreeDotsSelf}
                                   setDisplay={setDisplay}
                                   setDeletePost={setDeletePost}
                                   setEditPost={setEditPost}
                    />
                </div>
                :
                <div/>
            }


            {unfollow ?
                <div style={{position:"absolute",width:"100%", zIndex:25, top:`${scrollPosition}px`}}>
                    <UnFollow setUnfollow={setUnfollow}/>
                </div>
                :
                <div/>
            }


            {deletePost ?
                <div style={{position:"absolute",width:"100%", zIndex:25, top:`${scrollPosition}px`}}>
                    <DeletePost setDeletePost={setDeletePost}/>
                </div>
                :
                <div/>
            }

            {editPost ?
                <div style={{position:"absolute",width:"100%",zIndex:25, top:`${scrollPosition}px`}}>
                    <EditPost setEditPost={setEditPost}/>
                </div>
                :
                <div/>
            }

            <NavBar open={open} setOpen={setOpen} setSwitchAccount={setSwitchAccount}/>

            <Routes>
                <Route path="/" element={
                    <MainContent
                        display={display}
                        setDisplay={setDisplay}
                        setSwitchAccount={setSwitchAccount}
                        friendsSuggestion={friendsSuggestion}
                        setFriendsSuggestion={setFriendsSuggestion}
                        setThreeDots={setThreeDots}


                />}/>
                <Route path="/:userName/*" element={<PersonalPage display={display} setDisplay={setDisplay} setUnfollow={setUnfollow}/>}/>
                <Route path="/accounts/edit" element={<Settings/>}/>
                <Route path="/direct/*" element={<MessagePage setSwitchAccount={setSwitchAccount}/>}/>
                <Route path="/explore" element={<Explore display={display} setDisplay={setDisplay}/>}/>
                <Route path="/explore/people" element={<SeeAll friendSuggestion={friendsSuggestion}/>}/>
                <Route path="/p/:postId" element={<DisplayNewPage/>}/>
            </Routes>

            {/*<MainContent/>*/}
        </div>
    );
};

export default HomePage;