import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LogoutReturnHome from "./Logout-ReturnHome";
import CommentForm from "./CommentForm";
import { format, formatDistanceToNow } from "date-fns";
import CommentList from "./CommentList";

const Post = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
    const [commentDates, setCommentDates] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/posts/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (response.data && response.data.post) {
                    setPost(response.data.post);
                    const storedUser = JSON.parse(localStorage.getItem('user'));
                    setUser(storedUser);

                    const postDate = new Date(response.data.post.createdAt);
                    const formattedPostDate = format(postDate, "yyyy-MM-dd HH:mm");
                    setFormattedDate(formattedPostDate);

                    if (response.data.post.comments.length > 0) {
                        const commentDates = response.data.post.comments.map((comment) => {
                            const commentDate = new Date(comment.createdAt);
                            return formatCustomDistance(commentDate, new Date());
                        });
                        setCommentDates(commentDates);
                    }
                } else {
                    console.error("Invalid response data:", response.data);
                    navigate("/");
                }
            } catch (err) {
                console.error("Error:", err);

                if (err.response && err.response.data && err.response.data.error) {
                    navigate("/");
                }
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleAddComment = async (commentData) => {
        try {
          const res = await axios.post(`/posts/${id}/comments`, commentData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
      
          if (res.data && res.data.post && res.data.newComment) {
            setPost(res.data.post);
      
            const latestCommentDate = new Date(res.data.newComment.createdAt);
            const newCommentDates = [...commentDates, formatCustomDistance(latestCommentDate, new Date())];
            setCommentDates(newCommentDates);
          } else {
            console.log("Invalid response data:", res.data);
          }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    const handleEditComment = (commentId) => {
        const commentToEdit = post.comments.find((comment) => comment.id === commentId);

        if (user && commentToEdit.user && user.id === commentToEdit.user.id) {
            setEditingCommentId(commentId);
            setEditedCommentContent(commentToEdit.content);
        } else {
            console.log("You are not authorized to edit this comment.");
        }
    };

    const handleSaveEdit = async (commentId, newContent) => {
        try {
            const commentToEdit = post.comments.find((comment) => comment.id === commentId);

            if (user && commentToEdit.user && user.id === commentToEdit.user.id) {
                await axios.put(
                    `/posts/${id}/comments/${commentId}`,
                    { content: newContent },
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                    }
                );

                setEditingCommentId(null);
                setEditedCommentContent("");

                const updatedPostResponse = await axios.get(`/posts/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (updatedPostResponse.data && updatedPostResponse.data.post) {
                    setPost(updatedPostResponse.data.post);
                    const updatedCommentDates = updatedPostResponse.data.post.comments.map((comment) => {
                        const commentDate = new Date(comment.createdAt);
                        return formatCustomDistance(commentDate, new Date());
                    });
                    setCommentDates(updatedCommentDates);
                }
            } else {
                console.log("You are not authorized to edit this comment.");
            }
        } catch (err) {
            console.error("Error editing comment:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const commentToDelete = post.comments.find((comment) => comment.id === commentId);

            if (user && commentToDelete.user && user.id === commentToDelete.user.id) {
                await axios.delete(`/posts/${id}/comments/${commentId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                const updatedPostResponse = await axios.get(`/posts/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (updatedPostResponse.data && updatedPostResponse.data.post) {
                    setPost(updatedPostResponse.data.post);
                    const updatedCommentDates = updatedPostResponse.data.post.comments.map((comment) => {
                        const commentDate = new Date(comment.createdAt);
                        return formatCustomDistance(commentDate, new Date());
                    });
                    setCommentDates(updatedCommentDates);
                }
            } else {
                console.log("You are not authorized to delete this comment.");
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };

    const formatCustomDistance = (from, to) => {
        const diffInMinutes = Math.floor((to - from) / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInMinutes < 24 * 60) {
            const diffInHours = Math.floor(diffInMinutes / 60);
            return `${diffInHours}h ago`;
        } else if (diffInMinutes < 7 * 24 * 60) {
            const diffInDays = Math.floor(diffInMinutes / (24 * 60));
            return `${diffInDays}d ago`;
        } else {
            return format(from, "yyyy-MM-dd");
        }
    };

    return (
        <div className="post-container">
            {post && (
                <div className="container-post-items">
                    {post.title && <h1 className="post-title">{post.title}</h1>}
                    <LogoutReturnHome />
                    <div className="post-items">
                        {post.image && <img className="blog-image" src={post.image} alt="image" />}
                        {post.content && <p className="post-content">{post.content}</p>}
                        <p className="post-time-created">{formattedDate}</p>
                    </div>
                    <div className="comment-container">
                        <CommentForm onAddComment={handleAddComment} />
                        <div className="comments-div">
                            {post.comments.map((comment, index) => (
                                <div className="profile-container" key={comment.id}>
                                    <div className="profile-items">
                                        {comment.user && comment.user.profileImage && (
                                            <img className="profile-picture" src={comment.user.profileImage} alt="Profile" />
                                        )}
                                        <div className="profile-name-comment">
                                            <div className="profile-name-time">
                                                <p className="profile-username">{comment.user && comment.user.username}</p>
                                                <div className="comment-time-actions">
                                                    <div className="profile-comment-time-div">
                                                        <p className="profile-comment-time">{commentDates[index]}</p>
                                                    </div>
                                                    <CommentList
                                                        comments={[comment]}
                                                        loggedInUser={user}
                                                        onEdit={handleEditComment}
                                                        onDelete={handleDeleteComment}
                                                    />
                                                </div>
                                            </div>
                                            {editingCommentId === comment.id ? (
                                                <div className="comment-edit-input-text">
                                                    <input
                                                        className="comment-edit-text"
                                                        type="text"
                                                        value={editedCommentContent}
                                                        onChange={(e) => setEditedCommentContent(e.target.value)}
                                                    />
                                                    <div className="comment-edit-btns">
                                                        <button className="comment-btn-save" onClick={() => handleSaveEdit(comment.id, editedCommentContent)}>Save</button>
                                                        <button className="comment-btn-cancel" onClick={() => setEditingCommentId(null)}>Cancel</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="profile-comment">{comment.content}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
