import React, {useState, useEffect} from 'react'
import axios from 'axios'

function MainPage_LoginBox() {


    const [error, setError] = useState({})
    const [page, setPage] = useState('login')
    const [uid, setUID] = useState(0)

    function check2fa () {
        setError({})
        let code2fa = document.querySelector("#code2fa").value 
        if (code2fa) {
            axios({
                method: 'post',
                responseType: 'json',
                url: '/altCEF/check2faCode',
                data: {uid: uid, enter_key: code2fa}
            })
            .then((response) => {
                if (response.data.result) {
                    axios.post("api/setSessionAfterLogin", {uid: uid})
                    .then((response) => {
                        location.reload(true)
                    })
                } else {
                    setError({code2fa: "Wprowadzono nieprawidłowy kod"})
                }
            })
        } else {
            setError({code2fa: "Pole kod dwuetapowej weryfikacji jest wymagane"})
        }
    }

    function login () {
        setError({})
        let data = {}
        let username = document.querySelector("#username").value
        let password = document.querySelector("#password").value
        
        if (username && password) {
             data = {username: username, password: password}
        
            axios({
               method: 'post',
               responseType: 'json',
               url:  "api/loginToWWW",
               data: data
            })
            .then((response) => {
                if (response.data.errors) {
                    setError({username: response.data.errors.username, password: response.data.errors.password})
                } else {
                    if (response.data.is2fa) {
                        setUID(response.data.id)
                        setPage('2fa')
                    } else {
                        axios.post("api/setSessionAfterLogin", {uid: response.data.id})
                        .then((response) => {
                            location.reload(true)
                        })
                    }
                }
            })

        } else {
            if (!username && !password) {
                setError({username: "Pole nazwa użytkownika jest wymagane", password: "Pole hasło jest wymagane"})
            } else if (!username && password) {
                setError({username: "Pole nazwa użytkownika jest wymagane"})
            } else if (username && !password) {
                setError({password: "Pole hasło jest wymagane"})

            }
        }
            
    }

    useEffect(() => {
        let username = document.querySelector("#error-username")
        let password = document.querySelector("#error-password")

        if (username && error.username) {
            username.style.display = "block"
        }

        if (password && error.password) {
            password.style.display = "block"
        }

    }, [error])


  return (
    (page == 'login') ?
    <div className="WWW_MainPage_Box">
        <h3 className="WWW_MainPage_Header">Zaloguj się</h3>
        <p>Dane do logowania są takie same jak do konta w grze.</p>
        <form>
            {error && error.username && <div className="WWW_MainPage_Error" id="error-username">{error.username}</div>}
            <input className="WWW_MainPage_TextInput" id="username" type="text" name="username" placeholder="Nazwa użytkownika" autoComplete="username"/>
            {error && error.password && <div className="WWW_MainPage_Error" id="error-password">{error.password}</div>}
            <input className="WWW_MainPage_TextInput" id="password" type="password" name="password" placeholder="Hasło" autoComplete="password"/>
            <button onClick={event => {login()}} className="WWW_MainPage_Button" type="button"><span className="WWW_MainPage_buttonIcon"><i className="fa-solid fa-square-check"></i></span><span className="WWW_MainPage_buttonText">Zaloguj się</span></button>
        </form>
    </div>  
    :
    <div className="WWW_MainPage_Box">
    <h3 className="WWW_MainPage_Header">Dwuetapowa weryfikacja</h3>
    <form>
        {error && error.code2fa && <div className="WWW_MainPage_Error" id="error-code2fa">{error.code2fa}</div>}
        <input className="WWW_MainPage_TextInput" id="code2fa" type="number" name="code2fa" placeholder="6 znakowy kod" autoComplete="code2fa"/>
        <button onClick={event => {check2fa()}} className="WWW_MainPage_Button" type="button"><span className="WWW_MainPage_buttonIcon"><i className="fa-solid fa-square-check"></i></span><span className="WWW_MainPage_buttonText">Potwierdź</span></button>
    </form>
    </div>
    )
}

export default MainPage_LoginBox