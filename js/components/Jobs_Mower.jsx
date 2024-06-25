import React, { useState } from "react";
import { useCallback } from "react";

function Jobs_Mower() {
    const [panel, setPanel] = useState("startJob");

    const exitMenu = () => alt.emit("jobMower_exitMenu");
    const jobStart = (level) => alt.emit("jobMower_jobStart", level);

    return (
        <div className="jobMower_container">
            <div className="jobMower_box">
                <div className="jobMower_miniatures">
                    <img src="/storage/miniatures/mower1.png" />
                    <img src="/storage/miniatures/mower2.png" />
                </div>
                <div className="jobMower_information">
                    <div className="jobMower_title">
                        <h1>Praca dorywcza</h1>
                        <h2>- Zieleń miejska -</h2>
                        <h5>Punkty pracy: 1234</h5>
                    </div>
                    <div
                        className="jobMower_level"
                        onClick={(e) => jobStart(1)}
                    >
                        <div className="jobMower_level_icon">
                            <i class="fa-sharp fa-solid fa-square-1"></i>
                        </div>
                        <div className="jobMower_level_description">
                            <p>
                                <b>Wymagania:</b> prawo jazdy kategorii B
                            </p>
                            <p>
                                <b>Zadanie:</b> Wejdź do stojącego na parkingu
                                pojazdu <b>Youga</b> i udaj się do jednego z
                                wyznaczonych na mapie obszarów koszenia. Gdy
                                dotrzesz do obszaru wyciągnij z pojazdu kosiarkę
                                i rozpocznij koszenie.
                            </p>
                        </div>
                    </div>

                    <div
                        className="jobMower_levels"
                        onClick={(e) => jobStart(2)}
                    >
                        <div className="jobMower_level">
                            <div className="jobMower_level_icon">
                                <i class="fa-sharp fa-solid fa-square-2"></i>
                            </div>
                            <div className="jobMower_level_description">
                                <p>
                                    <b>Wymagania:</b> prawo jazdy kategorii B,
                                    1200 punktów pracy
                                </p>
                                <p>
                                    <b>Zadanie:</b> Wejdź do stojącego na
                                    parkingu traktora, a następnie doczep
                                    przyczepę i udaj się do punktu odbioru
                                    trawy. Przetransportuj trawę do magazynu.
                                </p>
                            </div>
                        </div>
                    </div>
                    <button className="jobMower_button" onClick={exitMenu}>
                        <i class="fa-sharp fa-solid fa-circle-xmark"></i>{" "}
                        Zamknij
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Jobs_Mower;
