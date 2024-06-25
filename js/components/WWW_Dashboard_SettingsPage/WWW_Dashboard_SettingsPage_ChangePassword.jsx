import React, {useState, useEffect} from 'react'
import axios from 'axios'

function WWW_Dashboard_SettingsPage_ChangePassword() {
  
  const [notify, setNotify] = useState(null)
  const [view, setView] = useState("changePassword")
  const [data, setData] = useState(null)

  useEffect(() => {
    let notifyElement = document.querySelector("#notify-password")
    if (notifyElement) {
      if (notify) notifyElement.style.display = "block"
      else notifyElement.style.display = 'none'
    }
  }, [notify])

  function changePassword (oldPassword, newPassword) {
    setNotify(null)
    axios.post("api/changePassword", {oldPassword: oldPassword, newPassword: newPassword})
    .then ((response) => {
      if (!response.data.error) {
        setNotify({type: "success", text: "Pomyślnie zmieniono hasło."})
        document.querySelector("#changePasswordForm").style.display = "none"
      } else setNotify({type: "error", text: response.data.error})
    })
    .catch ((error) => setNotify({type: "error", text: error}))
  }

  function check2fa () {
    setNotify(null)
    let code2fa = document.querySelector("#code2fa").value 
    if (code2fa) {
      axios.post("api/check2fa", {enter_key: code2fa})
      .then((response) => {
        if (response.data.result) changePassword(data.oldPassword, data.newPassword)
        else setNotify({type: "error", text: "Podany kod jest nieprawidłowy"})
      })
      .catch((error) => setNotify({type: "error", text: error}))
    } else setNotify({type: "error", text: "6 - znakowy kod jest wymagany."})
  }

  function changePasswordButton() {
    let oldPassword = document.querySelector('#old_password').value
    let newPassword = document.querySelector('#new_password').value
    let repeatNewPassword = document.querySelector('#repeat_new_password').value

    if (oldPassword && newPassword && repeatNewPassword) {
      if (newPassword != repeatNewPassword) setNotify({type: "error", text: "Podane hasła nie są takie same"})
      else {
        axios.get("api/is2fa")
        .then((response) => {
          if (response.data.is2fa) {
            setData({oldPassword: oldPassword, newPassword: newPassword})
            setView("2fa")
          } else changePassword(oldPassword, newPassword)
        })
        .catch((error) => setNotify({type: "error", text: error}))
      }
    } else setNotify({type: "error", text: "Wszystkie pola są wymagane."})

  }

  return (
    (view == "changePassword") ?
    <div className="WWW_Dashboard_SettingsPage_Option_Content">
      <h4>Hasło</h4>
      <p><b>Uwaga: </b>Jeżeli posiadasz włączoną dwuetapową weryfikację wymagana będzie autoryzacja przed zmianą hasła.</p>
      {notify && notify.text && notify.type && <div className={`WWW_MainPage_${notify.type}`} id="notify-password">{notify.text}</div>}
      <form id="changePasswordForm">
        <input className="WWW_Dashboard_SettingsPage_TextInput" id="old_password" type="password" name="old_password" placeholder="Stare hasło" autoComplete="old_password"/>
        <input className="WWW_Dashboard_SettingsPage_TextInput" id="new_password" type="password" name="new_password" placeholder="Nowe hasło" autoComplete="new_password"/>
        <input className="WWW_Dashboard_SettingsPage_TextInput" id="repeat_new_password" type="password" name="repeat_new_password" placeholder="Powtórz nowe hasło" autoComplete="repeat_new_password"/>
        <button onClick={event => {changePasswordButton()}} className="WWW_Dashboard_SettingsPage_Button" id="new_password_button" type="button"><span className="WWW_Dashboard_SettingsPage_buttonIcon"><i className="fa-solid fa-square-check"></i></span><span className="WWW_Dashboard_SettingsPage_buttonText">Zmień</span></button>
      </form>
    </div>
    :
    <div className="WWW_Dashboard_SettingsPage_Option_Content">
      <h4>Dwuetapowa weryfikacja</h4>
      <p>W celu zmiany hasła wpisz 6 - znakowy kod z aplikacji Google Authenticator.</p>
      {notify && notify.text && notify.type && <div className={`WWW_MainPage_${notify.type}`} id="notify-password">{notify.text}</div>}
      <form>
        <input className="WWW_Dashboard_SettingsPage_TextInput" id="code2fa" type="number" name="code2fa" placeholder="6 - znakowy kod" autoComplete="code2fa"/>
        <button onClick={event => {check2fa()}} className="WWW_Dashboard_SettingsPage_Button" id="new_password_button" type="button"><span className="WWW_Dashboard_SettingsPage_buttonIcon"><i className="fa-solid fa-square-check"></i></span><span className="WWW_Dashboard_SettingsPage_buttonText">Potwierdź</span></button>
      </form>
    </div>
  )
}

export default WWW_Dashboard_SettingsPage_ChangePassword