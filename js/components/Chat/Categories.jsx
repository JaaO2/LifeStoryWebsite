import React, {useState, useEffect} from 'react'
import Category from './Category'

function Chat_Categories(props) {
    return (
        <div className="chat_CategoriesMenu">
            {props.categories && (props.categories).length ? (props.categories).map((category) => {
                return (
                    <Category selectCategory = {props.selectCategory} setSelectCategory={(values) => {props.setSelectCategory(values)}} name={category.name} color={category.color} icon={category.icon} logo={category.logo} />
                )
            }): <></>}
        </div>
    )
}

export default Chat_Categories

