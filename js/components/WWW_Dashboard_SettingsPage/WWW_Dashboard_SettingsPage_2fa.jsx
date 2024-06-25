import axios from "axios";
import React, { useState, useEffect } from "react";

function WWW_Dashboard_SettingsPage_2fa() {
    const [view, setView] = useState(null);
    const [data, setData] = useState(null);
    const [notify, setNotify] = useState(null);
    const [showQR, setShowQR] = useState(false);

    if (view == null) {
        axios
            .get(`/users/two-factor-auth`)
            .then((response) => {
                if (response.data.is2fa) setView("check2fa");
                else setView("settings2fa");
            })
            .catch(setView(false));
    }

    if (view == "settings2fa" && !data) {
        axios.get("api/is2faWithCode").then((response) => {
            if (response.data)
                setData({
                    code: response.data.code,
                    is2fa: response.data.is2fa,
                    secret: response.data.secret,
                });
        });
    }

    function showQRAction() {
        setShowQR(!showQR);
    }

    function set2fa() {
        setNotify(null);
        let code2fa = document.querySelector("#code2fa").value;

        if (code2fa) {
            axios
                .post("users/two-factor-auth", {
                    secret: data.secret,
                    enter_key: code2fa,
                })
                .then((response) => {
                    if (response.data.result) {
                        setView("check2fa");
                        setView("settings2fa");
                        setData({ ...data, is2fa: true });
                    } else
                        setNotify({
                            type: "error",
                            text: "Wprowadzono nieprawidłowy kod",
                        });
                })
                .catch((error) => setNotify({ type: "error", text: error }));
        } else
            setNotify({
                type: "error",
                text: "Pole 6 - znakowy kod jest wymagane.",
            });
    }

    function check2fa() {
        setNotify(null);
        let code2fa = document.querySelector("#code2fa").value;

        if (code2fa) {
            axios
                .post("api/check2fa", { enter_key: code2fa })
                .then((response) => {
                    if (response.data.result) {
                        setView("settings2fa");
                    } else
                        setNotify({
                            type: "error",
                            text: "Wprowadzony kod jest nieprawidłowy.",
                        });
                })
                .catch((error) => setNotify({ type: "error", text: error }));
        } else
            setNotify({
                type: "error",
                text: "Pole 6 - znakowy kod jest wymagane.",
            });
    }

    function off2fa() {
        axios.post("api/off2fa", {}).then((response) => {
            if (response.data.result) {
                setData(null);
            }
        });
    }

    useEffect(() => {
        let notifyElement = document.querySelector("#notify-code2fa");
        if (notifyElement) {
            if (notify) notifyElement.style.display = "block";
            else notifyElement.style.display = "none";
        }
    }, [notify]);

    return view ? (
        view != "check2fa" ? (
            <div className="WWW_Dashboard_SettingsPage_Option_Content">
                <h4>Ustawienia dwuetapowej weryfikacji</h4>
                {data ? (
                    <>
                        {data.is2fa ? (
                            <div>
                                <p>
                                    Poniżej możesz zmienić ustawienia
                                    dwuetapowej weryfikacji. Możesz również
                                    zeskanować kod na kolejnym urządzeniu.
                                </p>
                                <div className="WWW_Dashboard_SettingsPage_QrCode">
                                    {showQR ? (
                                        <img
                                            onClick={(event) => {
                                                showQRAction();
                                            }}
                                            src={`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${data.code}`}
                                        />
                                    ) : (
                                        <div
                                            className="WWW_Dashboard_SettingsPage_QrCodeHide"
                                            onClick={(event) => {
                                                showQRAction();
                                            }}
                                        >
                                            Kliknij tutaj, aby odkryć kod QR
                                        </div>
                                    )}
                                    <button
                                        onClick={(event) => {
                                            off2fa();
                                        }}
                                        className="WWW_Dashboard_SettingsPage_Button"
                                        id="code2fa_button"
                                        type="button"
                                    >
                                        <span className="WWW_Dashboard_SettingsPage_buttonIcon">
                                            <i className="fa-solid fa-xmark"></i>
                                        </span>
                                        <span className="WWW_Dashboard_SettingsPage_buttonText">
                                            Wyłącz dwuetapową weryfikację
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    Zeskanuj kod aplikacją Google Authenticator
                                    w celu zabezpieczenia swojego konta. W celu
                                    weryfikacji wpisz 6 - znakowy kod w polu
                                    poniżej.
                                </p>
                                <div className="WWW_Dashboard_SettingsPage_QrCode">
                                    {showQR ? (
                                        <img
                                            onClick={(event) => {
                                                showQRAction();
                                            }}
                                            src={`https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${data.code}`}
                                        />
                                    ) : (
                                        <div
                                            className="WWW_Dashboard_SettingsPage_QrCodeHide"
                                            onClick={(event) => {
                                                showQRAction();
                                            }}
                                        >
                                            Kliknij tutaj, aby odkryć kod QR
                                        </div>
                                    )}
                                </div>
                                <div className="WWW_Dashboard_SettingsPage_2fa_Form">
                                    <p></p>
                                    {notify && notify.text && notify.type && (
                                        <div
                                            className={`WWW_MainPage_${notify.type}`}
                                            id="notify-code2fa"
                                        >
                                            {notify.text}
                                        </div>
                                    )}
                                    <input
                                        className="WWW_Dashboard_SettingsPage_TextInput"
                                        id="code2fa"
                                        type="number"
                                        name="code2fa"
                                        placeholder="6 - znakowy kod"
                                        autoComplete="code2fa"
                                    />
                                    <button
                                        onClick={(event) => {
                                            set2fa();
                                        }}
                                        className="WWW_Dashboard_SettingsPage_Button"
                                        id="code2fa_button"
                                        type="button"
                                    >
                                        <span className="WWW_Dashboard_SettingsPage_buttonIcon">
                                            <i className="fa-solid fa-square-xmark"></i>
                                        </span>
                                        <span className="WWW_Dashboard_SettingsPage_buttonText">
                                            Potwierdź
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        ) : (
            <div className="WWW_Dashboard_SettingsPage_Option_Content">
                <h4>Dwuetapowa weryfikacja</h4>
                <p>
                    Aby przejść do ustawień dwuetapowej weryfikacji wpisz
                    poniżej 6 - znakowy kod z aplikacji Google Authenticator.
                </p>
                {notify && notify.text && notify.type && (
                    <div
                        className={`WWW_MainPage_${notify.type}`}
                        id="notify-code2fa"
                    >
                        {notify.text}
                    </div>
                )}
                <input
                    className="WWW_Dashboard_SettingsPage_TextInput"
                    id="code2fa"
                    type="number"
                    name="code2fa"
                    placeholder="6 - znakowy kod"
                    autoComplete="code2fa"
                />
                <button
                    onClick={(event) => {
                        check2fa();
                    }}
                    className="WWW_Dashboard_SettingsPage_Button"
                    id="code2fa_button"
                    type="button"
                >
                    <span className="WWW_Dashboard_SettingsPage_buttonIcon">
                        <i className="fa-solid fa-square-check"></i>
                    </span>
                    <span className="WWW_Dashboard_SettingsPage_buttonText">
                        Potwierdź
                    </span>
                </button>
            </div>
        )
    ) : (
        <div>Loading...</div>
    );
}

export default WWW_Dashboard_SettingsPage_2fa;
