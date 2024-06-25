import React, {useState, useEffect} from 'react'
import axios from 'axios'

function WWW_Dashboard_SettingsPage_DisplayUsername(props) {

  const [notify, setNotify] = useState(null)

  function changeDisplayUsername () {
    let newDisplayUsername = document.querySelector("#new_display_username").value
    setNotify(null)
    if (newDisplayUsername) {
      axios.put("api/setNewDisplayUsername", {newDisplayUsername: newDisplayUsername})
      .then ((response) => {
        if (response.data.change) {
          setNotify({type: "success", text: `Nazwa wyświetlana została pomyślnie zmieniona na ${newDisplayUsername}.`})
          document.querySelector("#new_display_username").style.display = "none";
          document.querySelector("#new_display_username_button").style.display = "none";
          props.socket.emit("set-display_username", response.data.uid, newDisplayUsername)
        } else setNotify({type: "error", text: response.data.error})
      })
      .catch((error) => setNotify({type: "error", text: error}))
    } else setNotify({type: "error", text: "Pole nowa nazwa wyświetlana jest wymagane."})
  }

  useEffect(() => {
    let notifyDisplayUsername = document.querySelector("#notify-display_username")
    if (notifyDisplayUsername) {
      if (notify) notifyDisplayUsername.style.display = "block"
      else notifyDisplayUsername.style.display = "none"
    }
  }, [notify])

  return (
    <div className="WWW_Dashboard_SettingsPage_Option_Content">
        <h4>Nazwa wyświetlana</h4>
        <p><b>Uwaga: </b> Zmiana nazwy wyświetlanej nie zmienia loginu. W grze oraz w panelu internetowym należy nadal logować się korzystając z loginu (nazwa użytkownika ustalona podczas rejestracji).<br/>Nazwa wyświetlana zmienia się automatycznie w grze.<br/>Dozwolona jest jedna zmiana nazwy wyświetlanej w ciągu 14 dni.</p>
        {notify && notify.text && notify.type && <div className={`WWW_MainPage_${notify.type}`} id="notify-display_username">{notify.text}</div>}
        <input className="WWW_Dashboard_SettingsPage_TextInput" id="new_display_username" type="text" name="new_display_username" placeholder="Nowa nazwa wyświetlana" autoComplete="new_display_username"/>
        <button onClick={event => {changeDisplayUsername()}} className="WWW_Dashboard_SettingsPage_Button" id="new_display_username_button" type="button"><span className="WWW_Dashboard_SettingsPage_buttonIcon"><i className="fa-solid fa-square-check"></i></span><span className="WWW_Dashboard_SettingsPage_buttonText">Zmień</span></button>
    </div>
  )
}

export default WWW_Dashboard_SettingsPage_DisplayUsername