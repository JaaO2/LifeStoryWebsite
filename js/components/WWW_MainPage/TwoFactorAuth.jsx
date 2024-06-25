import axios from "axios";
import React, { useRef, useState } from "react";
import Input from "../AuthPanel/Input";

function TwoFactorAuth(props) {
    const [errors, setErrors] = useState({});
    const TwoFactorRef = useRef();

    const inputs = [
        {
            name: "TwoFactorCode",
            type: "number",
            icon: "fa-solid fa-user",
            ref: { TwoFactorRef },
            replace: "kod",
            placeholder: "6 - znakowy kod",
        },
    ];

    const verify = async (event) => {
        setErrors({});
        event.preventDefault();
        const data = new FormData(event.target);
        let formObject = Object.fromEntries(data);
        formObject = {
            ...formObject,
            TwoFactorCode_uid: props.TwoFactorUid,
            isWebPanel: true,
        };

        try {
            let response = await axios.get("users/login", {
                params: formObject,
            });
            if (response?.data) {
                window.location.href = "/";
            }
        } catch (error) {
            if (error?.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <form className="authPanel_box_content_login" onSubmit={verify}>
            <h1>Dwuetapowa weryfikacja</h1>
            <span>
                Podaj kod dwuetapowej weryfikacji z aplikacji Google
                Authenticator
            </span>
            {inputs.map((input) => {
                return <Input inputData={input} errors={errors} />;
            })}
            <button className="authPanel_submit">
                <i className="fa-solid fa-right-to-bracket"></i> Potwierdź
            </button>
        </form>
    );
}

export default TwoFactorAuth;
