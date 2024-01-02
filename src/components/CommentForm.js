import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
    const [commentText, setCommentText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim() !== "") {
            onAddComment({ content: commentText });
            setCommentText("");
        }
    };


    return(
        <div className='comment-form'>
            <form onSubmit={handleSubmit}>
                <input className='comment-input'type='text' placeholder='Add a comment' value={commentText}  onChange={(e) => setCommentText(e.target.value)} />
                <button className='btn-comment-submit' type='submit'>Send</button>
            </form>
        </div>
    )
}


export default CommentForm;