import axios from "axios";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Input from "./Input";
import Discord from "./Discord";

function Login(props) {
    const [errors, setErrors] = useState({});

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

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
            ref: passwordRef,
        },
    ];

    const showDiscordError = useCallback((error) => {
        setErrors({ username: error });
    });

    useEffect(() => {
        if ("alt" in window) {
            alt.on("auth:discord:error", showDiscordError);
            return () => {
                alt.off("auth:discord:error", showDiscordError);
            };
        }
    });

    const login = async (event) => {
        setErrors({});
        event.preventDefault();
        const data = new FormData(event.target);
        let formObject = Object.fromEntries(data);

        try {
            let response = await axios.get("/users/login", {
                params: formObject,
            });

            if (response.data.TwoFactor) {
                axios.post("/api/logs", {
                    type: "Poprawne logowanie - 2FA",
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
                props.setUserData(response.data);
                props.setCurrentTab("check2fa");
            } else {
                axios.post("/api/logs", {
                    type: "Poprawne logowanie",
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
                alt.emit("successLogin", response.data);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
                axios.post("/api/logs", {
                    type: "Niepoprawne logowanie",
                    suspicious: 0,
                    other:
                        "IP: " +
                        props.serialData.ip +
                        " HWID: " +
                        props.serialData.hwidHash +
                        " HWIDEx: " +
                        props.serialData.hwidExHash +
                        " SOCIAL ID: " +
                        props.serialData.socialID +
                        " Login: " +
                        data.username +
                        " Szczegóły: " +
                        JSON.stringify(error.response.data.errors),
                    executeUser: null,
                    onUser: null,
                });
            }
        }
    };

    return (
        <form className="authPanel_box_content_login" onSubmit={login}>
            <h3>
                <i className="fa-solid fa-user"></i> Logowanie
            </h3>
            {inputs.map((input) => {
                return <Input inputData={input} errors={errors} />;
            })}
            <button className="authPanel_submit">
                <i className="fa-solid fa-right-to-bracket"></i> Zaloguj się
            </button>
            <Discord />
        </form>
    );
}

export default Login;
