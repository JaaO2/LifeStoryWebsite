import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Buttons from "./AuthPanel/Buttons";
import BoxContent from "./AuthPanel/BoxContent";

function AuthPanel() {
    const [currentTab, setCurrentTab] = useState("main");
    const [serialData, setSerialData] = useState(null);
    const [userData, setUserData] = useState({});
    const [registerStatus, setRegisterStatus] = useState({});
    const [updateID, setUpdateID] = useState(null);

    const getOtherResponse = useCallback((isOther, data) => {
        if (!isOther) return alt.emit("successLoginAfterCheckOther", data);
        setErrors({
            username:
                "Ktoś już jest zalogowany na tym koncie. Jeżeli to nie Ty skontaktuj się z Administracją.",
        });
    }, []);

    useEffect(() => {
        if ("alt" in window) {
            alt.on("otherResponse", getOtherResponse);
            return () => {
                alt.off("otherResponse", getOtherResponse);
            };
        }
    }, [getOtherResponse]);

    useEffect(() => {
        if (serialData) {
            localStorage.setItem("serialData", JSON.stringify(serialData));
        }
    }, [serialData]);

    const getSerialData = useCallback((data) => {
        setSerialData(data);
    }, []);

    useEffect(() => {
        if ("alt" in window) {
            alt.on("sendSerialData", getSerialData);
            return () => {
                alt.off("sendSerialData", getSerialData);
            };
        }
    }, []);

    return (
        <div className="authPanel_box">
            <div className="authPanel_box_content">
                <Buttons
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                />
                <BoxContent
                    currentTab={currentTab}
                    serialData={serialData}
                    setCurrentTab={setCurrentTab}
                    userData={userData}
                    setUserData={setUserData}
                    registerStatus={registerStatus}
                    setRegisterStatus={setRegisterStatus}
                    updateID={updateID}
                    setUpdateID={setUpdateID}
                />
            </div>
        </div>
    );
}

export default AuthPanel;
