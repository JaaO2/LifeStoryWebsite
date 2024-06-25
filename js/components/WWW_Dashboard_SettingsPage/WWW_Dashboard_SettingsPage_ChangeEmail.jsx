import React, {useState, useEffect} from 'react'
import axios from 'axios'

function WWW_Dashboard_SettingsPage_ChangeEmail() {

  const [notify, setNotify] = useState(null)
  const [data, setData] = useState(null)
  const [view, setView] = useState("changeEmail")

  useEffect(() => {
    let notifyElement = document.querySelector("#notify-email")
    if (notifyElement) {
      if (notify) notifyElement.style.display = "block"
      else notifyElement.style.display = 'none'
    }
  }, [notify])

  function changeEmail (newEmail) {
    setNotify(null)
    let dataAPI = {newEmail: newEmail}
    axios.post("api/changeEmailAddress", dataAPI)
    .then ((response) => {
      if (!response.data.errors) {
        setNotify({type: "success", text: "Pomyślnie zmieniono email."})
        document.querySelector("#changeEmailForm").style.display = "none"
      } else setNotify({type: "error", text: response.data.errors.newEmail})
    })
    .catch ((error) => setNotify({type: "error", text: error}))
  }

  function check2fa () {
    setNotify(null)
    let code2fa = document.querySelector("#code2fa").value 
    if (code2fa) {
      axios.post("api/check2fa", {enter_key: code2fa})
      .then((response) => {
        if (response.data.result) changeEmail(data.newEmail)
        else setNotify({type: "error", text: "Podany kod jest nieprawidłowy"})
      })
      .catch((error) => setNotify({type: "error", text: error}))
    } else setNotify({type: "error", text: "6 - znakowy kod jest wymagany."})
  }

  function changeEmailButton () {
    let newEmail = document.querySelector("#new_email").value
    setNotify({})

    if (newEmail) {
      axios.get("api/is2fa")
      .then((response) => {
        if (response.data.is2fa) {
          setData({newEmail: newEmail})
          setView("2fa")
        } else changeEmail(newEmail)
      })
      .catch((error) => setNotify({type: "error", text: error}))

    } else setNotify({type: "error", text: "Nowy adres email jest wymagany"})
  }

  return (
    (view == "changeEmail") ?
    <div className="WWW_Dashboard_SettingsPage_Option_Content">
      <h4>Zmiana adresu email</h4>
      <p><b>UWAGA: </b>Dozwolona jest tylko jedna zmiana adresu email w ciągu 14 dni. Zmiana wymaga weryfikacji nowego adresu. Do czasu weryfikacji do konta pozostaje przypisany stary adres email.</p>
      {notify && notify.text && notify.type && <div className={`WWW_MainPage_${notify.type}`} id="notify-email">{notify.text}</div>}
      <form id="changeEmailForm">
        <input className="WWW_Dashboard_SettingsPage_TextInput" id="new_email" type="email" name="new_email" placeholder="Nowy adres email" autoComplete="new_email"/>
        <button onClick={event => {changeEmailButton()}} className="WWW_Dashboard_SettingsPage_Button" id="new_email_button" type="button"><span className="WWW_Dashboard_SettingsPage_buttonIcon"><i className="fa-solid fa-square-check"></i></span><span className="WWW_Dashboard_SettingsPage_buttonText">Zmień</span></button>
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

export default WWW_Dashboard_SettingsPage_ChangeEmail