import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

function UpdateView(props) {
    const [update, setUpdate] = useState({});

    if (Object.keys(update).length === 0 && update.constructor === Object) {
        axios.get(`/updates/${props.updateID}`).then((response) => {
            setUpdate(response.data);
        });
    }

    return (
        <div className="authPanel_box_content_text">
            <h3 className="authPanel_rules_header">{update.title}</h3>
            <div className="rulesContent">
                <ReactMarkdown
                    children={update.content}
                    remarkPlugins={[remarkGfm]}
                />
            </div>
        </div>
    );
}

export default UpdateView;
