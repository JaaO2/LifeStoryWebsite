import axios from "axios";
import React, { useRef } from "react";
import Header from "./WWW_MainPage/Header";
import Footer from "./WWW_MainPage/Footer";

function EmailVerification_NoVerified() {
    const buttonsRef = useRef(null);

    const logout = async () => {
        await axios.get("/users/logout");
        window.location.href = "/";
    };

    const resendEmail = async () => {
        try {
            await axios.post("users/email/resend");
        } catch (error) {
            console.log(error);
        }
        buttonsRef.current.innerHTML = `Wiadomość z linkiem do weryfikacji została wysłana. Sprawdź swoją skrzynkę pocztową.`;
    };

    return (
        <div className="WWW_MainPage">
            <Header />
            <div className="WWW_Wrapper">
                <div className="WWW_Wrapper_Box">
                    <div className="WWW_Wrapper_Box_Header">
                        Weryfikacja email
                    </div>
                    <div className="WWW_Wrapper_Box_Content">
                        <h1>Adres email nie został jeszcze zweryfikowany</h1>
                        <p className="WWW_EmailVerification_Text">
                            Przejdź do swojej skrzynki pocztowej w celu
                            zweryfikowania adresu email. Jeżeli nie otrzymałeś
                            wiadomości z linkiem skorzystaj z przycisku poniżej.
                        </p>
                        <div
                            className="WWW_Wrapper_Box_Buttons"
                            ref={buttonsRef}
                        >
                            <button
                                className="WWW_Button"
                                onClick={resendEmail}
                            >
                                <i class="fa-sharp fa-solid fa-rotate-left"></i>{" "}
                                Wyślij ponownie
                            </button>
                            <button className="WWW_Button" onClick={logout}>
                                <i class="fa-solid fa-right-from-bracket"></i>{" "}
                                Wyloguj się
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EmailVerification_NoVerified;
