import React from "react";
import Header from "./WWW_MainPage/Header";
import Footer from "./WWW_MainPage/Footer";

function EmailVerification_notExist() {
    const backToMainPage = () => {
        window.location.href = "/";
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
                        <h1 style={{ color: "red" }}>
                            Weryfikacja nie powiodła się
                        </h1>
                        <p className="WWW_EmailVerification_Text">
                            <ol>
                                <li>
                                    Twój adres email został już zweryfikowany
                                </li>
                                <li>
                                    Link jest nieprawidłowy - jeżeli nie masz
                                    dostępu do wiadomości email z prawidłowym
                                    linkiem zaloguj się na swoje konto, aby
                                    wygenerować nowy link
                                </li>
                                <li>
                                    Link wygasł (czas na wykorzystanie linku to
                                    14 dni) - jeżeli nie masz dostepu do
                                    wiadomości email z ważnym linkiem zaloguj
                                    się na swoje konto, aby wygenerować nowy
                                    link
                                </li>
                            </ol>{" "}
                        </p>
                        <div className="WWW_Wrapper_Box_Buttons">
                            <button
                                className="WWW_Button"
                                onClick={backToMainPage}
                            >
                                <i class="fa-duotone fa-house-blank"></i> Powrót
                                do strony głównej
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EmailVerification_notExist;
