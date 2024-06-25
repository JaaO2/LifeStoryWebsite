import React, { forwardRef } from 'react';
import Message from './Message';

const MessagesBox = forwardRef((props, ref) => {

    return (
        <div ref={ref} className="chat_MessagesBox" id="chat_MessagesBox">
            {props.messages && props.messages.map((message) => {
                return (
                    props.selectCategory === message.category.name || props.selectCategory === 'all'
                ) ? (
                    <Message players={props.players} key={message.id} message={message} />
                ) : null;
            })}
        </div>
    );
});

export default MessagesBox;
