import React, { useState } from "react";
import axios from "axios";

function Check2fa(props) {
    const [number, setNumber] = useState("");
    const [errors, setErrors] = useState({});

    function checkLength(event) {
        const inputValue = event.target.value;
        if (inputValue.length <= 6) {
            setNumber(inputValue);
        }
    }

    function check2faCode() {
        setErrors({});
        const code = document.getElementById("code").value;
        let data = {
            TwoFactorCode_uid: props.userData.TwoFactorUid,
            TwoFactorCode: code,
        };
        axios
            .get("/users/login", { params: data })
            .then((response) => {
                if (response.data) alt.emit("successLogin", response.data);
            })
            .catch((error) => {
                setErrors(error.response.data.errors);
            });
    }

    return (
        <div className="authPanel_box_content_login">
            <h3>
                <i class="fa-solid fa-shield-halved"></i> Weryfikacja dwuetapowa
            </h3>
            <p>
                Wpisz poniżej kod z aplikacji Google Authenticator, aby
                potwierdzić, że konto, na które się logujesz należy do Ciebie.
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
                    id="code"
                    value={number}
                />
            </div>
            {errors.TwoFactorCode ? (
                <div className="authPanel_input_error" id="password-error">
                    <i className="fa-sharp fa-solid fa-circle-exclamation"></i>{" "}
                    {errors.TwoFactorCode.toString().replace(
                        "enter key",
                        "6 - znakowy kod"
                    )}
                </div>
            ) : (
                <></>
            )}
            <button onClick={check2faCode} class="authPanel_submit">
                <i class="fa-solid fa-right-to-bracket"></i> Potwierdz
            </button>
        </div>
    );
}

export default Check2fa;
