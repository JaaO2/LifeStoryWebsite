import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Input from "./Input.jsx";
import Discord from "./Discord";

function Register(props) {
    const [errors, setErrors] = useState({});
    const [registerLoading, setRegisterLoading] = useState(false);

    const usernameRef = useRef(null);
    const emailRef = useRef(null);

    const inputs = [
        {
            name: "username",
            placeholder: "Nazwa użytkownika",
            replace: "nazwa użytkownika",
            type: "text",
            icon: "fa-solid fa-user",
            ref: usernameRef,
        },
        {
            name: "password",
            placeholder: "Hasło",
            replace: "hasło",
            type: "password",
            icon: "fa-solid fa-key",
        },
        {
            name: "password_confirmation",
            placeholder: "Powtórz hasło",
            replace: "powtórz hasło",
            type: "password",
            icon: "fa-solid fa-key",
        },
        {
            name: "email",
            placeholder: "Adres email",
            replace: "adres email",
            type: "email",
            icon: "fa-solid fa-at",
            ref: emailRef,
        },
        {
            name: "rules",
            placeholder:
                "Rejestrując się w serwisie Life Story oświadczam, iż zapoznałem się z regulaminem (zakładka regulamin) oraz akceptuję jego postanowienia.",
            replace: "zaakceptuj regulamin",
            type: "checkbox",
            icon: null,
        },
    ];

    useEffect(() => setRegisterLoading(false), []);

    const showDiscordError = useCallback((error) => {
        setErrors({ username: error });
        console.log("REGISTER DISCORD ERROR: ", error);
    });

    useEffect(() => {
        if ("alt" in window) {
            alt.on("auth:discord:error", showDiscordError);
            return () => {
                alt.off("auth:discord:error", showDiscordError);
            };
        }
    });

    const register = async (event) => {
        setErrors({});
        setRegisterLoading(true);
        event.preventDefault();
        const data = new FormData(event.target);
        let formObject = Object.fromEntries(data);

        try {
            const response = await axios.post("/users", formObject);
            axios.post("/api/logs", {
                type: "Rejestracja konta",
                suspicious: 0,
                other:
                    "IP: " +
                    props.serialData.ip +
                    " HWID: " +
                    props.serialData.hwidHash +
                    " HWIDEx: " +
                    props.serialData.hwidExHash +
                    " SOCIAL ID: " +
                    props.serialData.socialID,
                executeUser: response.data.id,
                onUser: response.data.id,
            });
            props.setRegisterStatus({
                username: formObject.username,
                uid: response.data.id,
            });
            props.setCurrentTab("set2fa");
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
                setRegisterLoading(false);
            }
        }
    };

    return (
        <form className="authPanel_box_content_login" onSubmit={register}>
            <h3>
                <i className="fa-solid fa-user-plus"></i> Rejestracja
            </h3>
            {inputs.map((input) => {
                return <Input errors={errors} inputData={input} />;
            })}
            <button className="authPanel_submit" disabled={registerLoading}>
                <i className="fa-solid fa-right-to-backet"></i>{" "}
                {!registerLoading ? "Zarejestruj się" : "Trwa rejestracja..."}
            </button>
            <Discord />
        </form>
    );
}

export default Register;
