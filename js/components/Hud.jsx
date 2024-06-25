import React, { useState } from "react";

function Hud() {
    const [data, setData] = useState(null);

    if (!data) {
        // Domyślne dane, używane gdy 'data' jest null
        //  setData();
    }

    function getData(data) {
        data.money = new Intl.NumberFormat("pl-PL").format(data.money);
        setData(data);
    }
    alt.on("sendPlayerDataToHud", getData);

    return (
        // ('alt' in window) ?
        data ? (
            <>
                <div className="hud">
                    <div className="hudSectionTop">
                        <div className="hudInformation">
                            <div className="hudElement hudID">
                                <div className="hudElement_Icon">
                                    <p>
                                        <i className="fa-solid fa-hashtag"></i>
                                    </p>
                                </div>
                                <div className="hudElement_Text">
                                    <p>
                                        ID: {data.id} | UID: {data.uid}
                                    </p>
                                </div>
                            </div>
                            <div className="hudElement hudUsername">
                                <div className="hudElement_Icon">
                                    <p>
                                        <i className="fa-solid fa-user"></i>
                                    </p>
                                </div>
                                <div className="hudElement_Text">
                                    <p>
                                        {data.display_username} ({data.username}
                                        )
                                    </p>
                                </div>
                            </div>
                            <div
                                style={{
                                    background:
                                        data.usergroup.color != "#ffffff"
                                            ? data.usergroup.color
                                            : "#000000",
                                }}
                                className="hudElement hudRank"
                            >
                                <div className="hudElement_Icon">
                                    <p>
                                        <i className="fa-solid fa-people-group"></i>
                                    </p>
                                </div>
                                <div className="hudElement_Text">
                                    <p>{data.usergroup.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="hudAvatar">
                            <img src={"/storage/avatars/" + data.avatarUrl} />
                        </div>
                    </div>
                    <div className="hudSectionBottom">
                        {data.premium ? (
                            <div className="hudElement hudPremium">
                                <div className="hudElement_Icon">
                                    <p>
                                        <i className="fa-solid fa-star"></i>
                                    </p>
                                </div>
                                <div className="hudElement_Text">
                                    <p>Premium</p>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        {data.duty &&
                        (data.duty.status == "S1" ||
                            data.duty.status == "S2") ? (
                            <div
                                style={{ background: data.duty.color }}
                                className="hudElement hudDuty"
                            >
                                <div className="hudElement_Icon">
                                    <p>{data.duty.status}</p>
                                </div>
                                <div className="hudElement_Text">
                                    <p>{data.duty.fraction}</p>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="hudElement hudMoney">
                            <div className="hudElement_Icon">
                                <p>
                                    <i className="fa-solid fa-dollar-sign"></i>
                                </p>
                            </div>
                            <div className="hudElement_Text">
                                <p>{data.money}</p>
                            </div>
                        </div>
                        <div className="hudElement hudPoints">
                            <div className="hudElement_Icon">
                                <p>P</p>
                            </div>
                            <div className="hudElement_Text">
                                <p>{data.points}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hudVersion">
                    Life Story {data.serverVersion}{" "}
                    {data.serverEnviroment != "production" ? (
                        <span style={{ color: "#ff0000" }}>
                            ([LOCALHOST (no-production)] - ŚRODOWISKO
                            PROGRAMISTYCZNE)
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </>
        ) : (
            <></>
        )
        // : <div>Brak dostępu</div>
    );
}

export default Hud;
