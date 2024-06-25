import React, {useState} from 'react'
import Menu from './WWW_Dashboard_SettingsPage_Menu'
import DisplayUsername from './WWW_Dashboard_SettingsPage_DisplayUsername'
import ChangePassword from './WWW_Dashboard_SettingsPage_ChangePassword'
import ChangeEmail from './WWW_Dashboard_SettingsPage_ChangeEmail'
import ChangeAvatar from './WWW_Dashboard_SettingsPage_ChangeAvatar'
import Settings2fa from './WWW_Dashboard_SettingsPage_2fa'

function WWW_Dashboard_Settings_Content(props) {

  const [option, setOption] = useState(<DisplayUsername socket = {props.socket} />)

  function changeOption (newOption) {
    setOption(newOption)  
  }

  return (
    <div className="WWW_Dashboard_Content">
      <h3>Ustawienia</h3>
      <div className="WWW_Dashboard_Settings_Box">
        <Menu socket={props.socket} changeOption={changeOption} />
        <div className="WWW_Dashboard_Settings_Content">
          {option}
        </div>
      </div>
    </div>
  )
}

export default WWW_Dashboard_Settings_Content