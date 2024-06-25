import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

function Main() {
    const [welcomeText, setWelcomeText] = useState({});

    if (
        Object.keys(welcomeText).length === 0 &&
        welcomeText.constructor === Object
    ) {
        axios.get("/pages/2").then((response) => {
            setWelcomeText(response.data);
        });
    }

    return (
        <div className="authPanel_box_content_text">
            {!(
                Object.keys(welcomeText).length === 0 &&
                welcomeText.constructor === Object
            ) ? (
                <ReactMarkdown
                    className="markdown-content"
                    children={welcomeText.content}
                    remarkPlugins={[remarkGfm]}
                />
            ) : (
                <>Brak tekstu do załadowania</>
            )}
        </div>
    );
}

export default Main;
