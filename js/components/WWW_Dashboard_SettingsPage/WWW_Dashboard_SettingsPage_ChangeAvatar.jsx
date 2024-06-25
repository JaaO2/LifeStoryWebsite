import React, {useState} from 'react'
import axios from 'axios'

function WWW_Dashboard_SettingsPage_ChangeAvatar(props) {

  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState(null)
  const [notify, setNotify] = useState(null)

  if (!preview) {
  axios.get('api/showAvatar')
    .then ((response) => {
      if (response.data) setPreview('/storage/avatars/'+response.data.avatar)
    })
  }
  
  function handleChange (e) {
    setAvatar(e.target.files[0])
    
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
        setPreview(reader.result);
    };
  }

  async function handleSetAvatar(e) {
    e.preventDefault()

    const button = e.nativeEvent.submitter.name;

    if (button == "set_avatar") {
      if (avatar) {
        const formData = new FormData()
        formData.append('avatar', avatar)
    
        await axios.post('api/setAvatar', formData)
        .then ((response) => {
          if (response.data.change) {
            setNotify({type: "success", text: `Avatar został pomyślnie zmieniony.`})
            document.querySelector("#new_avatar_button").style.display = "none";
            document.querySelector("#delete_avatar_button").style.display = "none";
            document.querySelector("#avatar").style.display = "none";
            document.querySelector("#avatar_label").style.display = "none";
            props.socket.emit("set-avatar", response.data.uid, response.data.avatar)
          } else setNotify({type: "error", text: response.data.error})
        })
        .catch((error) => setNotify({type: "error", text: error}))
      } else setNotify({type: "error", text: "Pole avatar jest wymagane."})
    } else {
      await axios.post('api/deleteAvatar')
      .then ((response) => {
        if (response.data.change) {
          setNotify({type: "success", text: `Avatar został pomyślnie usunięty.`})
          document.querySelector("#new_avatar_button").style.display = "none";
          document.querySelector("#delete_avatar_button").style.display = "none";
          document.querySelector("#avatar").style.display = "none";
          document.querySelector("#avatar_label").style.display = "none";
          setPreview("/storage/avatars/default.png")
          props.socket.emit("set-avatar", response.data.uid, "default.png")
        } else setNotify({type: "error", text: response.data.error})
      })
      .catch((error) => setNotify({type: "error", text: error}))
    }
  }


  return (
    <div className="WWW_Dashboard_SettingsPage_Option_Content">
      <h4>Zmień avatar</h4>
      {(preview) ?
      <form onSubmit={handleSetAvatar}>
      <div className="WWW_Dashboard_SettingsPage_Avatar_Preview">
        <img src={preview} />
      </div>
      {notify && notify.text && notify.type && <div className={`WWW_MainPage_${notify.type}`} id="notify-avatar">{notify.text}</div>}
        <div className="WWW_Dashboard_SettingsPage_Input_Avatar">
          <input type="file" accept="image/*" id="avatar"  name="avatar"  autoComplete="avatar" onChange={handleChange}/>
          <label for="avatar" id="avatar_label">Wybierz plik</label>
          <button name="set_avatar" className="WWW_Dashboard_SettingsPage_Button" id="new_avatar_button" type="submit"><span className="WWW_Dashboard_SettingsPage_buttonIcon"><i className="fa-solid fa-square-check"></i></span><span className="WWW_Dashboard_SettingsPage_buttonText">Zmień</span></button>
          {(preview != "/storage/avatars/default.png") ?
            <button name="delete_avatar" className="WWW_Dashboard_SettingsPage_Button" id="delete_avatar_button" type="submit"><span className="WWW_Dashboard_SettingsPage_buttonIcon"><i class="fa-solid fa-trash-can"></i></span><span className="WWW_Dashboard_SettingsPage_buttonText">Usuń</span></button>
          : <></>}
        </div>
      </form>
      : <div>Loading...</div>}
    </div>
  )
}

export default WWW_Dashboard_SettingsPage_ChangeAvatar