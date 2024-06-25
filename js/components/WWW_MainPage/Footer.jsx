import axios from "axios";
import React, { useEffect, useState } from "react";

function Footer() {
    const [version, setVersion] = useState(null);

    useEffect(() => {
        axios.get("/system/version").then((response) => {
            setVersion(response.data);
        });
    }, []);

    return (
        <div className="WWW_Footer">
            <span>&copy; Life Story 2023 - Wszelkie prawa zastrzeżone </span>
            <span>Wersja: {version}</span>
        </div>
    );
}

export default Footer;
