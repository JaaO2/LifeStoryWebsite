import React, { useState } from "react";
import axios from "axios";

function Updates(props) {
    const [updates, setUpdates] = useState([]);

    if (updates.length === 0) {
        axios.get("/updates").then((response) => {
            setUpdates(response.data);
        });
    }

    function viewUpdate(updateID) {
        props.setUpdateID(updateID);
        props.setCurrentTab("updateView");
    }

    return (
        <div className="authPanel_box_content_text">
            <h3 className="authPanel_rules_header">
                <i class="fa-solid fa-newspaper"></i> Ostatnie aktualizacje
            </h3>
            <div className="updatesContent">
                {updates.length != 0 ? (
                    <>
                        {updates.map((update) => {
                            return (
                                <div
                                    onClick={(e) => viewUpdate(update.id)}
                                    className="authPanel_update"
                                >
                                    <div className="authPanel_update_photoBox">
                                        <img src={update.photo} />
                                    </div>
                                    <div className="authPanel_update_content">
                                        <div className="authPanel_update_title">
                                            {update.title}
                                        </div>
                                        <div className="authPanel_update_date">
                                            <p>
                                                Autor:{" "}
                                                {update.author.display_username}{" "}
                                                | {update.public_date}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <>Brak aktualizacji do załadowania</>
                )}
            </div>
        </div>
    );
}

export default Updates;
