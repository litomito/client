import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Logout from './Logout';

const StaticPosts = () => {
    const postId = [1, 2, 3];
    const imgArray = [
        "https://www.freecodecamp.org/news/content/images/2021/07/reactcourse.png",
        "https://www.freecodecamp.org/news/content/images/2021/10/angular.png",
        "https://www.tatvasoft.com/blog/wp-content/uploads/2023/05/MEAN-Stack-vs-MERN-Stack-5-1-1280x720.jpg"
    ];
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/login")
            .then((data) => {
                const loggedIn = data.data.isLoggedIn;
                if (!loggedIn) {
                    navigate("/");
                }
            });
    }, [navigate]);

    return (
        <div className='post-container'>
            <h1 className='post-header'>Posts</h1>
            <Logout />
            <div className='posts'>
                <div className='posts-image'>
                    {postId.map((id, index) => (
                        <Link key={id} to={`/posts/${id}`}>
                            <img className='post-images' src={imgArray[index]} alt={`Post ${id}`} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StaticPosts;
