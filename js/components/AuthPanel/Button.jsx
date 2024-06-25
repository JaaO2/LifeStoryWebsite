import React from 'react'

function Button(props) {
  return (
    <button onClick={e => props.setCurrentTab(props.name)} className={((props.name == props.currentTab) ? "authPanel_menuButton authPanel_active_tab" : "authPanel_menuButton" )}><i class={`fa-solid ${props.icon}`}></i> {props.display}</button>
    )
}

export default Button