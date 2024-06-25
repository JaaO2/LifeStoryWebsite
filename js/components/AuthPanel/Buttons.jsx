import React, { useState, useEffect } from 'react'
import Button from './Button'

function Buttons (props) {
    const buttons = [
        {name: "main", display: "Strona Główna", icon: "fa-house"},
        {name: "login", display: "Logowanie", icon: "fa-right-to-bracket"},
        {name: "register", display: "Rejestracja", icon: "fa-user-plus"},
        {name: "rules", display: "Regulamin", icon: "fa-scale-balanced"},
        {name: "updates", display: "Aktualizacje", icon: "fa-solid fa-newspaper"},
    ]
    return (
    <div className="authPanel_box_content_buttons">
        {buttons.map((button => {
            return (<Button name={button.name} display={button.display} icon={button.icon} setCurrentTab={props.setCurrentTab} currentTab={props.currentTab}/>)
        }))}
        <div className="authPanel_box_logo">
            <img src="/storage/logos/ls.png"/>
        </div>
    </div>
    )
}

export default Buttons;