import React, { useState, useEffect, useCallback, useRef } from "react";
import Categories from "./Chat/Categories";
import MessagesBox from "./Chat/MessagesBox";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageType, setMessageType] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectCategory, setSelectCategory] = useState("all");
    const [messageHistory, setMessageHistory] = useState([]);
    const [currentMessageHistory, setCurrentMessageHistory] = useState(-1);
    const [players, setPlayers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(-1);
    const [suggestionBeforeText, setSuggestionBeforeText] = useState(null);

    const chatInputRef = useRef(null);
    const messagesBoxRef = useRef(null);

    if (
        chatInputRef &&
        chatInputRef.current &&
        chatInputRef.current.style.display === "block"
    )
        chatInputRef.current.focus();

    const openChatInputFunction = (chatType, playersALT) => {
        if (!messageType) {
            setMessageType({ display: chatType.display, type: chatType.name });
            setPlayers(playersALT);

            if (chatInputRef.current) {
                chatInputRef.current.style.display = "block";
                chatInputRef.current.focus();
            }
        }
    };

    const openChatInput = useCallback(openChatInputFunction, []);

    const openChatInputEffect = () => {
        alt.on("openChatInput", openChatInput);
        return () => alt.off("openChatInput", openChatInput);
    };

    useEffect(openChatInputEffect, []);

    const getCategoriesFromAltFunction = (categoriesALT) =>
        setCategories(categoriesALT);
    const getCategoriesFromAlt = useCallback(getCategoriesFromAltFunction, []);

    const getCategoriesFromAltEffect = () => {
        alt.on("sendCategories", getCategoriesFromAlt);
        return () => alt.off("sendCategories", getCategoriesFromAlt);
    };

    useEffect(getCategoriesFromAltEffect, [getCategoriesFromAlt]);

    const inputKeyActions = (event) => {
        if (!chatInputRef.current) return;

        let inputValue = chatInputRef.current.value;

        switch (event.key) {
            case "Enter":
                event.preventDefault();
                chatInputRef.current.blur();
                chatInputRef.current.style.display = "none";
                alt.emit("sendMessage", inputValue, messageType.type);

                if (
                    chatInputRef &&
                    chatInputRef.current.value &&
                    chatInputRef.current.value.length
                )
                    setMessageHistory([
                        chatInputRef.current.value,
                        ...messageHistory,
                    ]);

                chatInputRef.current.value = "";
                setMessageType(null);
                break;

            case "Escape":
                chatInputRef.current.blur();
                chatInputRef.current.style.display = "none";
                alt.emit("closeChat");
                chatInputRef.current.value = "";
                setMessageType(null);

            case "Tab":
                event.preventDefault();
                const words = inputValue.split(" ");
                const lastWord = words[words.length - 1];

                if (lastWord.startsWith("@")) {
                    const suggestionTerm = lastWord.substring(1);

                    if (suggestions.length === 0) {
                        setSuggestionBeforeText(suggestionTerm);
                        let suggestionsHelper = [];

                        players.forEach((player) => {
                            if (
                                player.display_username &&
                                player.display_username.startsWith(
                                    suggestionBeforeText
                                )
                            )
                                suggestionsHelper.push(player.display_username);
                        });
                        setSuggestions(suggestionsHelper);
                    } else if (inputValue && suggestions.length !== 0) {
                        setSuggestionIndex(
                            suggestionIndex < suggestions.lenght - 1
                                ? suggestionIndex + 1
                                : 0
                        );
                    }
                } else if (lastWord.startsWith("/")) {
                    // TUTAJ BĘDZIE PRZYPADEK Z PODPOWIADANIEM KOMEND
                }

                break;

            case "ArrowUp":
                if (
                    messageHistory &&
                    currentMessageHistory + 1 < messageHistory.length
                ) {
                    chatInputRef.current.value =
                        messageHistory[currentMessageHistory + 1];
                    setCurrentMessageHistory(currentMessageHistory + 1);
                } else {
                    chatInputRef.current.value = "";
                    setCurrentMessageHistory(-1);
                }
                break;

            case "ArrowDown":
                if (currentMessageHistory > 0) {
                    chatInputRef.current.value =
                        messageHistory[currentMessageHistory - 1];
                    setCurrentMessageHistory(currentMessageHistory - 1);
                } else {
                    chatInputRef.current.value = "";
                    setCurrentMessageHistory(-1);
                }
                break;

            default:
                break;
        }
    };

    const setSuggestionsEffect = () => {
        if (suggestions.length !== 0) setSuggestionIndex(0);
    };
    useEffect(setSuggestionsEffect, [suggestions]);

    const setSuggestionIndexEffect = () => {
        if (suggestions[suggestionIndex]) {
            let words = chatInputRef.current.value.split(" ");
            words.pop();
            words.push("@" + suggestions[suggestionIndex]);
            chatInputRef.current.value = words.join(" ");
        }
    };
    useEffect(setSuggestionIndexEffect, [suggestionIndex]);

    const changeInputValueSuggestion = () => {
        if (
            chatInputRef.current.value != suggestionBeforeText ||
            chatInputRef.current.value != suggestions[suggestionIndex]
        ) {
            setSuggestions([]);
            setSuggestionIndex(-1);
            setSuggestionBeforeText(null);
        }
    };

    const scrollbarDown = () => {
        if (messagesBoxRef.current)
            setTimeout(
                () =>
                    (messagesBoxRef.current.scrollTop =
                        messagesBoxRef.current.scrollHeight),
                0
            );
    };
    useEffect(scrollbarDown, [messages]);

    const pushMessage = (data) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                playerName: data.playerName,
                playerID: data.playerID,
                playerGroup: data.playerGroup,
                playerAvatar: data.playerAvatar,
                message: data.message,
                category: data.category,
            },
        ]);
        scrollbarDown();
    };

    const pushMessageEffect = () => {
        alt.on("pushMessage", pushMessage);
        return () => alt.off("pushMessage", pushMessage);
    };
    useEffect(pushMessageEffect, []);

    return (
        <div className="chat">
            <div className="chat_Container">
                <div className="chat_Box">
                    <Categories
                        categories={categories}
                        sa
                        selectCategory={selectCategory}
                        setSelectCategory={setSelectCategory}
                    />
                    <MessagesBox
                        players={players}
                        ref={messagesBoxRef}
                        selectCategory={selectCategory}
                        messages={messages}
                    />
                </div>
                <input
                    onChange={changeInputValueSuggestion}
                    ref={chatInputRef}
                    onKeyDown={inputKeyActions}
                    type="text"
                    className="chat_MessageInput"
                    id="chat_MessageInput"
                    placeholder={messageType ? messageType.display : ""}
                />
            </div>
        </div>
    );
}

export default Chat;
