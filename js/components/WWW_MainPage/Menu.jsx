import axios from "axios";
import React from "react";

function Menu() {
    const logout = async () => {
        await axios.get("/users/logout");
        window.location.href = "/";
    };

    return (
        <button onClick={logout} className="WWW_Button">
            <i class="fa-solid fa-right-from-bracket"></i> Wyloguj się
        </button>
    );
}

export default Menu;
