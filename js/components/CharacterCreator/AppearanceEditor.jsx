import React from "react";
import Feature from "./Feature";

function AppearanceEditor(props) {
    return (
        <>
            <div className="characterCreator_appearanceEditor">
                <div className="characterCreator_appearanceEditor_featuresList">
                    {props.selectedCategory.features.map((feature) => {
                        return (
                            <Feature
                                setAppearance={props.setAppearance}
                                feature={feature}
                                appearance={props.appearance}
                                select={props.select}
                            />
                        );
                    })}
                </div>
            </div>
            <button
                className="characterCreator_setAppearance_Button"
                onClick={(e) => props.setSelectedCategory(null)}
            >
                <i class="fa-solid fa-rotate-left"></i> Powrót
            </button>
        </>
    );
}

export default AppearanceEditor;
