import React, {useState, useEffect} from 'react'
import axios from 'axios'

function WWW_Dashboard_Menu() {

    let options = [
        {icon: "fa-house", name: "mainpage", title: "Strona Główna", isCategory: false, category: false},
        {icon: "fa-user-tie", name: "administration", title: "Administracja", isCategory: true, category: false},
        {icon: "", name: "administration_users", title: "Zarządzanie użytkownikami", isCategory: false, category: "administration"},
        {icon: "", name: "administration_vehicles", title: "Zarządzanie pojazdami", isCategory: false, category: "administration"},
        {icon: "", name: "administration_logs", title: "Przeglądanie logów", isCategory: false, category: "administration"},
        {icon: "", name: "administration_purmishments", title: "Zarządzanie karami", isCategory: false, category: "administration"},
        {icon: "", name: "administration_reports", title: "Zgłoszenia", isCategory: false, category: "administration"},
        {icon: "", name: "administration_stats", title: "Statystyki", isCategory: false, category: "administration"},
        {icon: "fa-gear", name: "settings", title: "Ustawienia", isCategory: false, category: false},
    ]

    const [permissions, setPermissions] = useState(null)

    function clickButton (option) {
        if (option.isCategory) {
            const isCategory_Box = document.querySelector("#isCategory_Box-"+option.name)
            isCategory_Box.style.display = (isCategory_Box.style.display == "none") ? "block" : "none"
        } else {
            window.location.href = (option.name == "mainpage") ? "/" : "/"+option.name
        } 
    }

  
    if (!permissions) {
        const data = {
            fromWWW: true
        }
        axios.post('api/getPermissions', data)
        .then((response) => {
            setPermissions(response.data.permissions)
        })
    }


    return (
    <div className="WWW_Dashboard_Menu_Options">
        {(permissions) ?
            <>
                {options.map((option) => {
                    if (!option.category && permissions.find(element => element == "www_tab_"+option.name)) {
                        return (
                            <div key={option.name} >
                            <div onClick={e => clickButton(option)} className={"WWW_Dashboard_Menu_Option"}>
                                <div className="WWW_Dashboard_Menu_Option_Icon"><i className={"fa-solid "+option.icon}></i></div>
                                <div className="WWW_Dashboard_Menu_Option_Name">{option.title}</div>
                                {(option.isCategory) && <div><i className="fa-solid fa-caret-down"></i></div>}
                            </div>
                            {(option.isCategory) ?
                                <div className="WWW_Dashboard_Menu_isCategory_Box" id={"isCategory_Box-"+option.name}>
                                    {options.map((subOption) => {
                                        if (subOption.category == option.name && permissions.find(element => element == "www_tab_"+subOption.name)) {
                                            return (
                                                <li onClick={() => clickButton(subOption)} key={subOption.name} className="WWW_Dashboard_Menu_Suboption">{subOption.title}</li>
                                            )
                                        }
                                    })}
                                </div>
                            :""}
                            </div>  
                        )    
                    }
                    })
                }
            </>
        : "Loading..."}

    </div>
  )
}

export default WWW_Dashboard_Menu