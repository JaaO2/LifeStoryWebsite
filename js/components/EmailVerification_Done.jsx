import React from "react";
import Header from "./WWW_MainPage/Header";
import Footer from "./WWW_MainPage/Footer";

function EmailVerification_Done() {
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
                        <h1>Pomyślnie zweryfikowana adres email</h1>
                        <p className="WWW_EmailVerification_Text">
                            Możesz powrócić teraz do strony głównej. Miłej gry!
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

export default EmailVerification_Done;
