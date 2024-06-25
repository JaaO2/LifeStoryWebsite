import React from "react";
import Error from "./Error";

function Input(props) {
    if (props.inputData.type == "checkbox") {
        return (
            <>
                <input
                    type={props.inputData.type}
                    name={props.inputData.name}
                    id={props.inputData.name}
                    className="authPanel_checkbox"
                    ref={props.inputData.ref}
                />
                <label
                    for={props.inputData.name}
                    className="authPanel_checkbox-label"
                >
                    {props.inputData.placeholder}
                </label>
                {props.errors[props.inputData?.name] && (
                    <Error inputData={props.inputData} errors={props.errors} />
                )}
            </>
        );
    } else {
        return (
            <>
                <div className="authPanel_input-box">
                    <div className="authPanel_input-icon">
                        <i className={props.inputData?.icon}></i>
                    </div>
                    <input
                        name={props.inputData?.name}
                        className="authPanel_input"
                        type={props.inputData?.type}
                        placeholder={props.inputData?.placeholder}
                        ref={props.inputData?.ref}
                    />
                </div>
                {props.errors[props.inputData?.name] && (
                    <Error inputData={props.inputData} errors={props.errors} />
                )}
            </>
        );
    }
}

export default Input;
