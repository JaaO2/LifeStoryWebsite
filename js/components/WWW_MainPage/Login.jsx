import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import Input from "../AuthPanel/Input";

function Login(props) {
    const [errors, setErrors] = useState({});
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const inputs = [
        {
            name: "username",
            type: "text",
            icon: "fa-solid fa-user",
            ref: { usernameRef },
            replace: "nazwa użytkownika",
            placeholder: "Nazwa użytkownika",
        },
        {
            name: "password",
            type: "password",
            icon: "fa-solid fa-key",
            ref: { passwordRef },
            replace: "hasło",
            placeholder: "Hasło",
        },
    ];

    const login = async (event) => {
        setErrors({});
        event.preventDefault();
        const data = new FormData(event.target);
        let formObject = Object.fromEntries(data);
        formObject = { ...formObject, isWebPanel: true };

        try {
            let response = await axios.get("users/login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                params: formObject,
            });
            console.log(response);
            if (response?.data) {
                if (response.data.TwoFactor) {
                    props.setPage("TwoFactorAuth");
                    props.setTwoFactorUid(response.data.TwoFactorUid);
                } else {
                    window.location.href = "/";
                }
            }
        } catch (error) {
            if (error?.response?.data?.errors) {
                setErrors(error?.response?.data.errors);
            }
        }
    };

    const loginDiscord = () => {
        const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
        const redirectUri = encodeURIComponent(
            import.meta.env.VITE_DISCORD_REDIRECT_URI
        );
        const discordLoginUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20email`;

        window.location.href = discordLoginUrl;
    };

    return (
        <form className="authPanel_box_content_login" onSubmit={login}>
            <h1>Logowanie</h1>
            {inputs.map((input) => {
                return <Input inputData={input} errors={errors} />;
            })}
            <button className="authPanel_submit">
                <i className="fa-solid fa-right-to-bracket"></i> Zaloguj się
            </button>
            <button
                type="button"
                className="authPanel_submit_discord"
                onClick={(e) => loginDiscord()}
            >
                <i className="fa-brands fa-discord"></i> Zaloguj przez Discord
            </button>
        </form>
    );
}

export default Login;
