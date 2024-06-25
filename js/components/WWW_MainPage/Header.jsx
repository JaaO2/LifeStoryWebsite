import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import Menu from "./Menu";

function Header() {
    const [isLogin, setIsLogin] = useState(null);

    useEffect(() => {
        axios
            .get("/session/login")
            .then((response) => {
                setIsLogin(response.data.value ?? false);
            })
            .catch((error) => {
                console.log(
                    "Błąd pobierania sesji - skontaktuj się z Administracją"
                );
            });
    }, []);

    const logoRedirect = useCallback(() => {
        window.location.href = "/";
    });

    return (
        <div className="WWW_MainPage_Header">
            <div className="WWW_MainPage_Logo" onClick={(e) => logoRedirect()}>
                <img src="/storage/logos/ls.png" />
            </div>
            {!isLogin ? [isLogin === null ? <></> : <LoginButton />] : <Menu />}
        </div>
    );
}

export default Header;
