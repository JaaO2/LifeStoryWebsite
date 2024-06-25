import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

function Rules() {
    const [rules, setRules] = useState({});

    if (Object.keys(rules).length === 0 && rules.constructor === Object) {
        axios.get("/pages/1").then((response) => {
            setRules(response.data);
        });
    }

    return (
        <div className="authPanel_box_content_text">
            <h3 className="authPanel_rules_header">
                <i class="fa-solid fa-scale-balanced"></i> Regulamin
            </h3>
            <div className="rulesContent">
                {!(
                    Object.keys(rules).length === 0 &&
                    rules.constructor === Object
                ) ? (
                    <ReactMarkdown
                        children={rules.content}
                        remarkPlugins={[remarkGfm]}
                    />
                ) : (
                    <>Brak tekstu do załadowania</>
                )}
            </div>
        </div>
    );
}

export default Rules;
