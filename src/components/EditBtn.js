import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";


const EditBtn = ({ onClick }) => {
    return (
        <button onClick={onClick} className="edit-btn">
            <FontAwesomeIcon icon={faPenToSquare} />
        </button>
    );
};

export default EditBtn;
