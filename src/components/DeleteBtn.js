import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const DeleteBtn = ({ onClick }) => {
    return (
        <button onClick={onClick} className="delete-btn">
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    );
};

export default DeleteBtn;
