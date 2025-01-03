import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getSamplePosts, getUserById } from "../../api";
import { updateStateSimple } from "../../redux/navbarStatusSlice";
import { updatePost } from "../../redux/postSlice";
import "./Explore.css";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const Explore = ({display, setDisplay}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateStateSimple('explore'))
    },[])


    const randomNumber = [
        {rows: 2, cols: 2},
        {rows: 1, cols: 1},
        {rows: 1, cols: 1},
        {rows: 1, cols: 2},
        {rows: 1, cols: 2},
        {rows: 2, cols: 2},
        {rows: 1, cols: 1},
        {rows: 1, cols: 1},
        {rows: 2, cols: 2},
        {rows: 1, cols: 1},
        {rows: 1, cols: 1},
        {rows: 1, cols: 2},
        {rows: 2, cols: 2},
        {rows: 1, cols: 1},
        {rows: 1, cols: 1},
        {rows: 1, cols: 2},
        {rows: 1, cols: 2},
        {rows: 2, cols: 2},
        {rows: 1, cols: 1},
        {rows: 1, cols: 1},
        {rows: 2, cols: 2},
        {rows: 1, cols: 1},
        {rows: 1, cols: 1},
        {rows: 1, cols: 2},
    ]

    const [posts, setPosts] = useState([]);

    const getRandomPosts = async () => {
        const res = await getSamplePosts(24);
        setPosts(posts => posts.concat(
            res.data.map(
                (p, index) => ({...p, ...randomNumber[index]}))))
    }

    useEffect(() => {
        getRandomPosts();
    },[])


    useEffect(() => {
        function handleScrollEvent() {
            if ((window.innerHeight + window.scrollY) + 250 >= document.getElementById("il").offsetHeight) {
                getRandomPosts();
            }
        }
        window.addEventListener('scroll', handleScrollEvent)
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        }
    }, [])



    return (
        <div className="explore_ct">
            <div style={{maxWidth:"70vw"}}>
                <ImageList
                    variant="quilted"
                    cols={4}
                    rowHeight={320}
                    gap={24}
                    id="il"
                >
                    {posts.map((item, index) => (
                        <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.imageUrl, 320, item.rows, item.cols)}
                                alt={item.postAlt}
                                loading="lazy"
                                onClick={async () => {
                                    const res = await getUserById(item.userId)
                                    dispatch(updatePost({...item, ...res.data}));
                                    setDisplay(true);
                                }}
                                className="explore_click"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
        </div>
    );
};

export default Explore;