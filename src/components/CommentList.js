import React from "react";
import CommentActions from "./CommentActions";

const CommentList = ({ comments, loggedInUser, onEdit, onDelete }) => {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-action-btns">
          {comment.userId === loggedInUser.id && (
            <CommentActions
              comment={comment}
              loggedInUser={loggedInUser}
              onEdit={() => onEdit(comment.id)}
              onDelete={() => onDelete(comment.id)}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default CommentList;
