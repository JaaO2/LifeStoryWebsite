import { appearanceCategories } from "./Variables";

import React from "react";

function AppearanceCategories(props) {
    return appearanceCategories
        .filter(
            (category) => category.sex == "all" || category.sex == props.sex
        )
        .map((category) => {
            return (
                <button
                    className="characterCreator_setAppearance_Button"
                    onClick={(e) => props.setSelectedCategory(category)}
                >
                    <i className={category.icon}></i> {category.display}
                </button>
            );
        });
}

export default AppearanceCategories;
