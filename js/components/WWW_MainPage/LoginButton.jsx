import React, { useCallback, useState } from "react";
import Popup from "../Popup";
import Login from "./Login";
import TwoFactorAuth from "./TwoFactorAuth";

function LoginButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [page, setPage] = useState("login");
    const [TwoFactorUid, setTwoFactorUid] = useState(null);

    const openLoginPopup = useCallback(() => {
        setIsPopupOpen(true);
    });

    const closeLoginPopup = useCallback(() => {
        setIsPopupOpen(false);
    });

    return (
        <>
            {" "}
            <button onClick={(e) => openLoginPopup()} className="WWW_Button">
                <i class="fa-solid fa-right-to-bracket"></i> Zaloguj się
            </button>
            <Popup
                isOpen={isPopupOpen}
                onClose={closeLoginPopup}
                title="Logowanie"
            >
                {page == "login" ? (
                    <Login
                        setPage={setPage}
                        setTwoFactorUid={setTwoFactorUid}
                    />
                ) : (
                    <TwoFactorAuth TwoFactorUid={TwoFactorUid} />
                )}
            </Popup>
        </>
    );
}

export default LoginButton;
