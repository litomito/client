import React from "react";
import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

const CommentActions = ({ comment, loggedInUser, onEdit, onDelete }) => {
    const isOwner = comment.user.id === loggedInUser.id;

    return (
        <>
            {isOwner ? (
                <>
                    <EditBtn onClick={onEdit} />
                    <DeleteBtn onClick={onDelete} />
                </>
            ) : null}
        </>
    );
};

export default CommentActions;
