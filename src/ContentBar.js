import "./ContentBar.css"
function ContentBar(props) {

    const library = { 0: "Inbox", 1: "Most Important", 2: "Less Important", 3: "Least Important", 4: "White-List"};

    const button_lib = { 0: "inbox", 1: "most", 2: "less", 3: "least", 4: "white"};

    const buttons = [];

    for (let i = 0; i < 5; i++){

        if (props.folder !== i) {
            buttons.push(
                <button className="unclicked" id={button_lib[i]} onClick={() => props.updateFolder(i, props.token)}>
                    {library[i]}
                </button>
            );
        } else {
            buttons.push(
                <button className="clicked" id={button_lib[i]} onClick={() => props.updateFolder(i, props.token)}>
                    {library[i]}
                </button>
            )
        }
    }

    const contentBar = <div id="content-bar">{buttons}</div>
    return contentBar;
}

export default ContentBar;