import React from 'react';
import PersonalContent from "../PersonalContent/PersonalContent";
import "./PersonalPage.css";

import { useParams } from "react-router-dom";

const PersonalPage = ({display, setDisplay, setUnfollow}) => {

    const {userName} = useParams();

    return (
        <div style={{minHeight:"100vh", transform:"translate(0, 62px)"}}>
            <PersonalContent display={display} setDisplay={setDisplay} userName={userName} setUnfollow={setUnfollow}/>
        </div>
    );
};

export default PersonalPage;