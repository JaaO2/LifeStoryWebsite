import React, { useState } from "react";
import axios from "axios";
import ChooseSex from "./ChooseSex";
import AppearanceCategories from "./AppearanceCategories";
import AppearanceEditor from "./AppearanceEditor";

function SetAppearance(props) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [zoom, setZoom] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    function save(event) {
        setIsSaving(true);
        axios
            .patch(`/users/${props.uid}`, {
                appearance: props.appearance,
                sex: props.sex == "men" ? 0 : 1,
                isCharacter: 1,
            })
            .then((response) => {
                alt.emit("closeCreatorCharacter", {
                    ...props.appearance,
                    sex: props.sex == "men" ? 0 : 1,
                });
            })
            .catch((error) => {
                console.log(
                    "BŁAD #1-01: zapytanie do API nie powiodło się. Skontaktuj się z Administracją."
                );
            });
    }

    const rotateCharacter = (direction) => {
        if (direction == "zoom") {
            setZoom(true);
        } else if (direction == "unzoom") {
            setZoom(false);
        }
        alt.emit("rotateCharacter", direction);
    };
    return (
        <>
            <div className="characterCreator_setAppearance">
                <div className="characterCreator_setAppearance_Header">
                    <i class="fa-regular fa-face-cowboy-hat"></i> Tworzenie
                    postaci
                </div>
                <div className="characterCreator_setAppearance_Content">
                    {selectedCategory && selectedCategory != null ? (
                        <AppearanceEditor
                            setSelectedCategory={setSelectedCategory}
                            selectedCategory={selectedCategory}
                            setAppearance={props.setAppearance}
                            appearance={props.appearance}
                            select={props.select}
                        />
                    ) : (
                        <div className="characterCreator_setAppearance_Categories">
                            <AppearanceCategories
                                sex={props.sex}
                                setSelectedCategory={setSelectedCategory}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="characterCreator_setAppearance_ArrowsBox">
                <div
                    className="characterCreator_setAppearance_Arrow"
                    onClick={(e) => rotateCharacter("left")}
                >
                    <i class="fa-solid fa-circle-arrow-left"></i>
                </div>
                <div
                    className="characterCreator_setAppearance_Arrow"
                    onClick={(e) => rotateCharacter(!zoom ? "zoom" : "unzoom")}
                >
                    {!zoom ? (
                        <i class="fa-solid fa-circle-plus"></i>
                    ) : (
                        <i class="fa-sharp fa-solid fa-circle-minus"></i>
                    )}
                </div>
                <div
                    className="characterCreator_setAppearance_Arrow"
                    onClick={(e) => rotateCharacter("right")}
                >
                    <i class="fa-solid fa-circle-arrow-right"></i>
                </div>
            </div>
            <button
                className="characterCreator_setAppearance_Save_Button"
                onClick={(e) => save()}
                disabled={isSaving}
            >
                <i class="fa-solid fa-floppy-disk"></i>{" "}
                {!isSaving ? "Zapisz" : "Trwa zapisywanie..."}
            </button>
            <div
                className="characterCreator_setAppearance_ChosenSex"
                onClick={(e) => {
                    props.setPage("chooseSex");
                    props.setSex(null);
                }}
            >
                <span className="characterCreator_setAppearance_chosenSex_Text">
                    {props.sex == "men" ? "Mężczyzna" : "Kobieta"}
                </span>
                {props.sex == "men" ? (
                    <>
                        <i class="fa-solid fa-mars"></i>
                    </>
                ) : (
                    <>
                        <i class="fa-solid fa-venus"></i>
                    </>
                )}
                <span className="characterCreator_setAppearance_chosenSex_Text">
                    Zmień
                </span>
            </div>
        </>
    );
}

export default SetAppearance;
