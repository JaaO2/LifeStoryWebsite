import React from 'react';

function Message({ message, players }) {
    const { playerAvatar, playerGroup, playerName, playerID, category } = message;

    const getUsernameById = id => {
        const player = players.find(p => String(p.id) === id || p.display_username === id);
        return player || id;
    };

    const highlightMentions = () => {
        const allMatches = players.flatMap(player => [player.display_username, String(player.id)]);
        const regexPattern = new RegExp(`@(${allMatches.join('|')})`, 'g');
        const parts = message.message.split(regexPattern);

        return parts.map((part, index) => {
            const matchedValue = part.replace('@', '');
            const isMatched = allMatches.includes(matchedValue);
            const displayValue = isMatched ? getUsernameById(matchedValue) : matchedValue;

            return (
                <span key={index}>
                    {isMatched && displayValue.isClient && <i className="fa-solid fa-at" style={{ ...mentionIconStyle }}></i>}
                    {isMatched ? (
                        <span style={{ ...mentionStyle, color: displayValue.usergroup.color }}>
                            {displayValue.display_username} ({displayValue.id})
                        </span>
                    ) : part}
                </span>
            );
        });
    };

    return (
        <div className="chat_Message">
            <div className="chat_Message_Avatar">
                <img src={`/storage/avatars/${playerAvatar}`} alt="Player Avatar" />
            </div>
            <div className="chat_Message_Box">
                <div className="chat_Message_Author" style={{ color: playerGroup.color }}>
                    <div className="chat_Message_Author_Name">{playerName} ({playerID})</div>
                    <div className="chat_Message_Author_Rank" style={{ background: getBackgroundColor(playerGroup.color) }}>
                        {playerGroup.name}
                    </div>
                    <div className="chat_Message_Author_Category" style={{ background: category.color }}>
                        {category.display}
                    </div>
                </div>
                <div className="chat_Message_Content">
                    {highlightMentions()}
                </div>
            </div>
        </div>
    );
}

const mentionIconStyle = {
    color: "#fff",
    background: "#ff6600",
    padding: "4px",
    borderRadius: "1rem",
    marginRight: "5px",
    textShadow: "none"
};

const mentionStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    textShadow: "2px 2px 1px rgba(0,0,0, 1)"
};

const getBackgroundColor = color => color.toLowerCase() === "#ffffff" ? "#000" : color;

export default Message;
