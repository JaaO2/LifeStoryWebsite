import axios from "axios";
import React from "react";

function Discord() {
    const discordConnect = async () => {
        alt.emit("auth:discord");
    };

    return (
        <>
            <button
                type="button"
                className="authPanel_submit_discord"
                onClick={discordConnect}
            >
                <i className="fa-brands fa-discord"></i> Zaloguj przez Discord
            </button>
            <p>
                *Logując się przez Discord oświadczasz, że zapoznałeś się z
                regulaminem (zakładka regulamin) i akceptujesz wszystkie jego
                postanowienia.
            </p>
        </>
    );
}

export default Discord;
