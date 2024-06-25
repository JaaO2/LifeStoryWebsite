import React from "react";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Rules from "./Rules";
import Check2fa from "./Check2fa";
import Set2fa from "./Set2fa";
import Updates from "./Updates";
import UpdateView from "./UpdateView";

function BoxContent(props) {
    switch (props.currentTab) {
        case "main":
            return <Main serialData={props.serialData} />;
            break;
        case "login":
            return (
                <Login
                    serialData={props.serialData}
                    setCurrentTab={props.setCurrentTab}
                    setUserData={props.setUserData}
                />
            );
            break;
        case "register":
            return (
                <Register
                    serialData={props.serialData}
                    setCurrentTab={props.setCurrentTab}
                    setRegisterStatus={props.setRegisterStatus}
                />
            );
            break;
        case "rules":
            return <Rules serialData={props.serialData} />;
            break;
        case "check2fa":
            return (
                <Check2fa
                    serialData={props.serialData}
                    setUserData={props.setUserData}
                    userData={props.userData}
                />
            );
            break;
        case "set2fa":
            return (
                <Set2fa
                    serialData={props.serialData}
                    registerStatus={props.registerStatus}
                    setCurrentTab={props.setCurrentTab}
                />
            );
            break;
        case "updates":
            return (
                <Updates
                    setUpdateID={props.setUpdateID}
                    setCurrentTab={props.setCurrentTab}
                />
            );
            break;
        case "updateView":
            return <UpdateView updateID={props.updateID} />;
            break;
    }
}

export default BoxContent;
