import "./ContentBar.css"
function ContentBar(props) {

    const library = { 0: "Inbox", 1: "Most Important", 2: "Less Important", 3: "Least Important", 4: "White-List"};

    const buttons = [];

    for (let i = 0; i < 5; i++){

        if (props.folder !== i) {
            buttons.push(
                <button class="unclicked" onClick={() => props.updateFolder(i, props.token)}>
                    {library[i]}
                </button>
            );
        } else {
            buttons.push(
                <button class="clicked" onClick={() => props.updateFolder(i, props.token)}>
                    {library[i]}
                </button>
            )
        }
    }

    const contentBar = <div id="content-bar">{buttons}</div>
    return contentBar;
}

export default ContentBar;