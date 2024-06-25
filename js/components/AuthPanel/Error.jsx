import React from "react";

function Error(props) {
    return (
        <div
            className="authPanel_input_error"
            id={props.inputData?.name + "-error"}
        >
            <i className="fa-sharp fa-solid fa-circle-exclamation"></i>{" "}
            {props.errors[props.inputData?.name]
                .toString()
                .replace(
                    new RegExp(props.inputData?.name, "g"),
                    props.inputData?.replace
                )
                .replace(new RegExp(",", "g"), " ")}
        </div>
    );
}

export default Error;
