import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";

function ChooseSpawnPanel() {
    const [spawns, setSpawns] = useState([]);
    const [currentSpawn, setCurrentSpawn] = useState({});

    function getUID(uid) {
        if (spawns.length === 0) {
            axios.get(`/spawns/player/${uid}`).then((response) => {
                setTimeout(() => {
                    setSpawns(response.data);
                }, 3000);
            });
        }
    }
    alt.on("getSpawnUID", getUID);

    useEffect(() => {
        setCurrentSpawn(spawns[0]);
    }, [spawns]);

    useEffect(() => {
        alt.emit("setCameraPosition", currentSpawn);

        const handleKeyDown = (event) => {
            if (currentSpawn) {
                const index = currentSpawn.id - 1;
                if (event.key === "ArrowRight") {
                    if (index + 1 > spawns.length - 1)
                        setCurrentSpawn(spawns[0]);
                    else setCurrentSpawn(spawns[index + 1]);
                } else if (event.key === "ArrowLeft") {
                    if (index - 1 < 0)
                        setCurrentSpawn(spawns[spawns.length - 1]);
                    else setCurrentSpawn(spawns[index - 1]);
                } else if (event.which === 32) {
                    alt.emit("spawnPlayer", currentSpawn);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Oczyszczanie event listenera po odmontowaniu komponentu
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentSpawn]);

    return spawns.length !== 0 ? (
        <div className="chooseSpawnPanel">
            <div className="chooseSpawnPanel_box">
                <div className="chooseSpawnPanel_box_arrow">
                    <i class="fa-solid fa-circle-arrow-left"></i>
                </div>
                <div className="chooseSpawnPanel_box_spawnName">
                    {currentSpawn ? currentSpawn.name : ""}
                </div>
                <div className="chooseSpawnPanel_box_arrow">
                    <i class="fa-solid fa-circle-arrow-right"></i>
                </div>
            </div>
            <div className="chooseSpawnPanel_additionalInformation">
                Aby wybrać ten spawn, kliknij spację. Aby przejść do innych
                spawnów kliknij strzałkę w lewo lub w prawo.
            </div>
        </div>
    ) : (
        <></>
    );
}

export default ChooseSpawnPanel;
