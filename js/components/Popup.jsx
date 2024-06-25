import React from "react";

function Popup(props) {
    if (!props.isOpen) return null;

    return (
        <div className="Popup">
            <div className="Popup_Header">
                <span>{props.title}</span>
                <span className="Popup_closeButton" onClick={props.onClose}>
                    <i class="fa-sharp fa-solid fa-circle-xmark"></i>
                </span>
            </div>
            <div className="Popup_Content">{props.children}</div>
        </div>
    );
}

export default Popup;
