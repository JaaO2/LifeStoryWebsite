import React from "react";
import ReactDOM from "react-dom";

import WWW_MainPage from "./components/WWW_MainPage";
import AuthPanel from "./components/AuthPanel";
import CharacterCreator from "./components/CharacterCreator";
import ChooseSpawnPanel from "./components/ChooseSpawnPanel";
import WWW_Dashboard_MainPage from "./components/WWW_Dashboard_MainPage";
import WWW_Dashboard_Settings from "./components/WWW_Dashboard_Settings";
import EmailVerification_notExist from "./components/EmailVerification_notExist";
import EmailVerification_Done from "./components/EmailVerification_Done";
import EmailNoVerified from "./components/EmailVerification_NoVerified";
import Hud from "./components/Hud";
import Chat from "./components/Chat";
import LoadingScreen from "./components/LoadingScreen";
import Jobs_Mower from "./components/Jobs_Mower";

import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_WEBSOCKET_URL;
const socket = io(socketUrl);

socket.on("connect_error", () => {
    const content = document.querySelector(".WWW_Dashboard_Content");
    if (content) content.innerHTML = "Błąd #002: Brak połączenia z systemem";
});

const renderers = {
    www_mainPage: <WWW_MainPage socket={socket} />,
    authPanel: <AuthPanel />,
    hud: <Hud />,
    characterCreator: <CharacterCreator />,
    chooseSpawnPanel: <ChooseSpawnPanel />,
    www_mainPage_Dashboard: <WWW_Dashboard_MainPage socket={socket} />,
    www_settingsPage_Dashboard: <WWW_Dashboard_Settings socket={socket} />,
    www_emailVerification_notExist: <EmailVerification_notExist />,
    www_emailVerification_Done: <EmailVerification_Done />,
    www_emailVerification_noVerified: <EmailNoVerified />,
    chat: <Chat socket={socket} />,
    loadingScreen: <LoadingScreen socket={socket} />,
    jobs_mower: <Jobs_Mower />,
};

Object.keys(renderers).forEach((renderer) => {
    if (document.getElementById(renderer))
        ReactDOM.render(renderers[renderer], document.getElementById(renderer));
});
