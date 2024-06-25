import React, {useState, useEffect} from 'react'

function Chat_Category (props) {
    return (
        <div style={{border: "4px solid " + ((props.selectCategory == props.name) ? "#005881" : "#444"), background: (props.color) ?  props.color : "rgba(0,0,0,0)"}} onClick={props.setSelectCategory.bind(null, props.name)} className="chat_Category">
            {(!props.logo) ? <i class={"fa-solid "+props.icon}></i> : <img style={{border: "4px solid " + ((props.selectCategory == props.name) ? "#005881" : "#444")}} src={"/storage/logos/"+props.logo} /> }
        </div>
    )
}

export default Chat_Category
