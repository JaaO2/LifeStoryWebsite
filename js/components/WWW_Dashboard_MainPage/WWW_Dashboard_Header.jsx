import React, {useState} from 'react'
import axios from 'axios'

function WWW_Dashboard_Header(props) {

  const [userData, setUserData] = useState(null)
  const socket = props.socket

  if (!userData) {
    axios.post("api/getDashboardHeaderData", {})
    .then((response) => {
      setUserData({username: response.data.username, display_username: response.data.display_username, uid: response.data.uid, avatar: response.data.avatar})
      socket.emit("chat message", "Użytkownik "+response.data.display_username+" ("+response.data.username+") zalogował się do systemu przez panel internetowy.")
    })
    .catch((error) => {
      setUserData({})
    })
  }


  function logout () {
    axios.post("api/wwwLogout", {})
    .then((response) => {
      window.location.href = "/"
    })
  }

return (
    <div className="WWW_Dashboard_Header">
        <div className="WWW_Dashboard_Header_Logo">Life Story</div>
        <div className="WWW_Dashboard_Header_User">
            {(userData) ?
            <>
            <div className="WWW_Dashboard_Header_User_Avatar"><img src={"/storage/avatars/"+userData.avatar}/></div>  
            <div className="WWW_Dashboard_Header_User_Username">{userData.display_username} ({userData.username}) <br/> [Identyfikator: {userData.uid}] </div>
            <div onClick={logout} className="WWW_Dashboard_Header_User_Logout">Wyloguj się</div>
            </> : "Loading..."
            }
        </div>
    </div>
  )
}

export default WWW_Dashboard_Header