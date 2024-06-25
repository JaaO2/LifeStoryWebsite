import React from "react";
import Spinner from "./Spinner";

function LoadingScreen() {
    return (
        <div className="loadingScreen_content">
            <img src="/storage/logos/ls.png" />
            <div className="loadingScreen_funfact">
                <p className="loadingScreen_funfact_Text">
                    Czy wiesz, że na naszym serwerze możesz zostać policjantem?
                    Wystarczy wysłać odpowiednie podanie w panelu internetowym
                    pod adresem lstory.eu!
                </p>
            </div>
            <div className="loadingScreen_spinnerBox">
                <div className="spinner_small"></div>{" "}
                <span>Wczytywanie...</span>
            </div>
        </div>
    );
}

export default LoadingScreen;
