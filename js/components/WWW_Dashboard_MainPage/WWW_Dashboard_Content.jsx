import React, {useState, useEffect} from 'react'
import axios from 'axios'

/* 
  TODO: Liczba użytkowników Discord
  TODO: Gotówka, stan konta i inne
*/

function WWW_Dashboard_Content(props) {

  const [userData, setUserData] = useState(null)
  const [serverStats, setServerStats] = useState(null)
  const socket = props.socket 

  
  if (!userData) {
    axios.post("api/getDashboardMainpageData", {})
    .then((response) => {
      setUserData({})
      setUserData({
        username: response.data.username, 
        display_username: response.data.display_username,
        uid: response.data.uid,
        email: response.data.email,
        registered_at: response.data.registered_at,
        last_logged: response.data.last_logged,
        usergroup_name: response.data.usergroup.name,
        usergroup_color: response.data.usergroup.color,
      })
      setServerStats({...serverStats, usersRegistered: response.data.allUsersRegistered})
    })
    .catch ((error) => {
      setUserData({})
      setServerStats({})
    })
  }

  useEffect(() => {
    if (!serverStats) {
      socket.emit("get-online-users")
      socket.on("send-online-users", (count) => {
        setServerStats({...serverStats, usersOnline: count})
      })
    } 
  }, [serverStats])

  function showEmail () {
    const showEmail = (!userData.showEmail) ? true : false
    setUserData({...userData, showEmail: showEmail})
  }

  return (
    <div className="WWW_Dashboard_Content">
      {(userData && serverStats) ?
        <>
          <h3>Witaj {userData.display_username}!</h3>
          <div className="WWW_Dashboard_MainPage">
            <div className="WWW_Dashboard_MainPage_Box">
              <h5>Informacje</h5>
              <p>Login: {userData.username}</p>
              <p>Wyświetlana nazwa użytkownika: {userData.display_username}</p>
              <p>Identyfikator: {userData.uid}</p>
              <p>Adres email: <span className="WWW_Dashboard_MainPage_hideEmail">{(userData.showEmail) ? <span onClick={showEmail}>{userData.email}</span> : <span onClick={showEmail} className="WWW_Dashboard_MainPage_hideEmail">Kliknij, aby odkryć</span>}</span></p>
              <p>Data rejestracji: {userData.registered_at}</p>
              <p>Ostatnio aktywny w grze: {userData.last_logged}</p>
              <p>Ranga: <span style={{color: userData.usergroup_color}}>{userData.usergroup_name}</span></p>
            </div>
            <div className="WWW_Dashboard_MainPage_Box">
              <h5>Nasze statystyki</h5>
              <p>Użytkowników online: {serverStats.usersOnline}</p>
              <p>Zarejestrowanych użytkowników: {serverStats.usersRegistered}</p>
              <p></p>
              <p>Użytkowników na serwerze Discord: </p>
            </div>
          </div>
          <div className="WWW_Dashboard_MainPage_Box">
              <h5>Inne informacje</h5>
              <p>Gotówka: </p>
              <p>Stan konta w banku: </p>
          </div>
        </>
      : "Loading.."}
    </div>
  )
}

export default WWW_Dashboard_Content