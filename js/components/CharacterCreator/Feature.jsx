import React from "react";

function Feature(props) {
    console.log("FEATURE:", props.appearance);

    return (
        <div className="characterCreator_feature">
            <div className="characterCreator_feature_name">
                {props.feature.display}
            </div>
            <div className="characterCreator_feature_changer">
                <div
                    className="characterCreator_feature_arrow"
                    onClick={(e) => props.select(props.feature, "previous")}
                >
                    <i class="fa-solid fa-circle-arrow-left"></i>
                </div>
                <div className="characterCreator_feature_value">
                    {props.feature.percent
                        ? props.appearance[props.feature.name] * 100 + "%"
                        : props.appearance[props.feature.name]}
                </div>
                <div
                    className="characterCreator_feature_arrow"
                    onClick={(e) => props.select(props.feature, "next")}
                >
                    <i class="fa-solid fa-circle-arrow-right"></i>
                </div>
            </div>
        </div>
    );
}

export default Feature;
