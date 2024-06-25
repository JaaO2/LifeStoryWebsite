import React, { useCallback, useState, useEffect } from "react";
import ChooseSex from "./CharacterCreator/ChooseSex";
import SetAppearance from "./CharacterCreator/SetAppearance";
import {
    setAppearanceCategories,
    appearanceDefault,
} from "./CharacterCreator/Variables";

function CharacterCreator() {
    const [sex, setSex] = useState(null);
    const [currentPage, setCurrentPage] = useState("chooseSex");
    const [appearance, setAppearance] = useState(appearanceDefault);
    const [uid, setUID] = useState(null);

    function getUID(uidData) {
        setUID(uidData);
    }
    alt.on("sendUID", getUID);

    useEffect(() => {
        if ("alt" in window) alt.emit("sendAppearanceData", appearance);
    }, [appearance]);

    const getNumHairColors = useCallback((values) => {
        setAppearanceCategories(values);
    }, []);

    useEffect(() => {
        if ("alt" in window) {
            alt.on("sendMaxValues", getNumHairColors);
            return () => {
                alt.off("sendMaxValues", getNumHairColors);
            };
        }
    }, [getNumHairColors]);

    const select = (feature, action) => {
        if (!feature || !feature.name) return;

        setAppearance((prevAppearance) => {
            let newValue = prevAppearance[feature.name];

            if (action === "next") {
                if (newValue == feature.maxValue) {
                    newValue = 0;
                } else {
                    newValue = feature.percent
                        ? (Number(newValue) + 0.1).toFixed(1)
                        : newValue + 1;
                }
            } else if (action === "previous") {
                if (newValue == 0) {
                    newValue = feature.maxValue;
                } else {
                    newValue = feature.percent
                        ? (Number(newValue) - 0.1).toFixed(1)
                        : newValue - 1;
                }
            }

            return { ...prevAppearance, [feature.name]: newValue };
        });
    };

    useEffect(() => {
        if (sex) {
            setCurrentPage("setAppearance");
            if ("alt" in window) {
                alt.emit(
                    "sendPlayerModel",
                    sex === "women" ? "MP_F_Freemode_01" : "MP_M_Freemode_01"
                );
            }
        }
    }, [sex]);

    return uid ? (
        <>
            {currentPage === "chooseSex" && <ChooseSex setSex={setSex} />}
            {currentPage === "setAppearance" && (
                <SetAppearance
                    setPage={setCurrentPage}
                    sex={sex}
                    uid={uid}
                    setSex={setSex}
                    setAppearance={setAppearance}
                    appearance={appearance}
                    select={select}
                />
            )}
        </>
    ) : (
        <></>
    );
}

export default CharacterCreator;
