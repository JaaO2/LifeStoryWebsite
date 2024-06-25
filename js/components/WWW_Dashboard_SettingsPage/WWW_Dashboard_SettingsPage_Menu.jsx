import React from 'react'
import DisplayUsername from './WWW_Dashboard_SettingsPage_DisplayUsername'
import ChangePassword from './WWW_Dashboard_SettingsPage_ChangePassword'
import ChangeEmail from './WWW_Dashboard_SettingsPage_ChangeEmail'
import ChangeAvatar from './WWW_Dashboard_SettingsPage_ChangeAvatar'
import Settings2fa from './WWW_Dashboard_SettingsPage_2fa'

function WWW_Dashboard_SettingsPage_Menu(props) {

const menu = [
    {newOption: <DisplayUsername socket = {props.socket} />, display: "Zmień nazwę wyświetlaną"},
    {newOption: <ChangePassword/>, display: "Zmień hasło"},
    {newOption: <ChangeEmail/>, display: "Zmień adres email"},
    {newOption: <ChangeAvatar socket = {props.socket}/>, display: "Zmień avatar"},
    {newOption: <Settings2fa/>, display: "Dwuetapowa weryfikacja"},
]

  return (
    <div className="WWW_Dashboard_SettingsPage_Menu">
      {menu.map((option) => {
        return (
          <div onClick={e => props.changeOption(option.newOption)} className="WWW_Dashboard_Settings_Option">{option.display}</div>
      )})}
    </div>
  )
}

export default WWW_Dashboard_SettingsPage_Menu