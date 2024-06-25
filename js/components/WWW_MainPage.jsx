import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./WWW_MainPage/Header";
import Content from "./WWW_MainPage/Content";
import Footer from "./WWW_MainPage/Footer";

function WWW_MainPage() {
    const [isDiscordLogin, setIsDiscordLogin] = useState(null);

    useEffect(async () => {
        const code = new URLSearchParams(location.search).get("code");
        if (code) {
            setIsDiscordLogin("Trwa logowanie przez Discord...");
            try {
                let response = await axios.get("users/login", {
                    params: { discordCode: code, isWebPanel: true },
                });
                if (response?.data) {
                    window.location.href = "/";
                }
            } catch (error) {
                setIsDiscordLogin(
                    `Nieprawidłowe logowanie. Jeżeli błąd się powtarza skontaktuj się z Administracją ${error.message}`
                );
                setTimeout(() => (window.location.href = "/"), 1500);
            }
        }
    }, []);

    return (
        <div className="WWW_MainPage">
            <Header />
            {!isDiscordLogin ? (
                <Content />
            ) : (
                <div className="WWW_Content_Information">{isDiscordLogin}</div>
            )}
            <Footer />
        </div>
    );
}

export default WWW_MainPage;
