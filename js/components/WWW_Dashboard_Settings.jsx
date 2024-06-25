import React from 'react'
import Header from './WWW_Dashboard_MainPage/WWW_Dashboard_Header'
import Menu from './WWW_Dashboard_MainPage/WWW_Dashboard_Menu'
import Settings from './WWW_Dashboard_SettingsPage/WWW_Dashboard_Settings_Content'

function WWW_Dashboard_Settings(props) {
  return (
    <div className="WWW_Dashboard_Body">
        <Header socket={props.socket}/>
        <div className="WWW_Dashboard_Wrapper">
            <Menu/>
            <Settings socket={props.socket}/>
        </div>
    </div>
  )
}

export default WWW_Dashboard_Settings