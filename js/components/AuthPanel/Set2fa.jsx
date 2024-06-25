import React, { useState } from "react";
import axios from "axios";

function Set2fa(props) {
    const [number, setNumber] = useState("");
    const [errors, setErrors] = useState({});

    const [codeQR, setCodeQR] = useState(0);
    const [codeSecret, setCodeSecret] = useState(0);

    let getQRCode = () => {
        let data = { username: props.registerStatus.username };
        axios
            .get("/users/two-factor-auth", { params: data })
            .then((response) => {
                setCodeQR(response.data.url);
                setCodeSecret(response.data.key);
            });
    };

    if (!codeQR) {
        getQRCode();
    }

    function checkLength(event) {
        const inputValue = event.target.value;
        if (inputValue.length <= 6) {
            setNumber(inputValue);
        }
    }

    function checkCode(event) {
        setErrors({});
        event.preventDefault();
        const data = new FormData(event.target);
        let formObject = {};
        for (let [key, value] of data.entries()) {
            formObject[key] = value;
        }

        let datas = {
            secret: codeSecret,
            uid: props.registerStatus.uid,
            enter_key: formObject.enter_key,
        };

        axios
            .post("/users/two-factor-auth", datas)
            .then((response) => {
                props.setCurrentTab("login");
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                )
                    setErrors(error.response.data.errors);
            });
    }

    return (
        <form className="authPanel_box_content_login" onSubmit={checkCode}>
            <h3>
                <i class="fa-solid fa-shield-halved"></i> Weryfikacja dwuetapowa
            </h3>
            <div className="authPanel_success">
                Gratulacje! Zarejestrowałeś się pomyślnie! Możesz teraz ustawić
                dwuetapową weryfikację korzystając z aplikacji Google
                Authenticator lub przejść do zakładki <b>Logowanie</b>.
            </div>
            {codeQR && (
                <img
                    className="authPanel_QR"
                    src={
                        "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=" +
                        codeQR
                    }
                />
            )}
            <p>
                Zeskanuj kod QR i wpisz poniżej kod uzyskany w aplikacji Google
                Authenticator
            </p>
            <div className="authPanel_input-box">
                <div className="authPanel_input-icon">
                    <i class="fa-solid fa-key"></i>
                </div>
                <input
                    onChange={checkLength}
                    className="authPanel_input"
                    type="number"
                    placeholder="6 - znakowy kod"
                    name="enter_key"
                    id="code"
                    value={number}
                />
            </div>
            {errors.enter_key ? (
                <div className="authPanel_input_error" id="password-error">
                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>{" "}
                    {errors.enter_key
                        .toString()
                        .replace("enter key", "6 - znakowy kod")}
                </div>
            ) : (
                <></>
            )}
            <button class="authPanel_submit">
                <i class="fa-solid fa-right-to-bracket"></i> Potwierdz
            </button>
            <button
                onClick={(e) => props.setCurrentTab("login")}
                class="authPanel_submit"
            >
                <i class="fa-solid fa-right-to-bracket"></i> Pomiń
            </button>
        </form>
    );
}

export default Set2fa;
