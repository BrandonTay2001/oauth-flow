function ContentBar(props) {

    const library = { 0: "Inbox", 1: "Most Important", 2: "Less Important", 3: "Least Important", 4: "White-List"};

    const contentBar = [];

    for (let i = 0; i < 5; i++){

        if (props.folder !== i) {
            contentBar.push(
                <button class="unclicked" onClick={() => props.updateFolder({folder: i})}>
                    {library[i]}
                </button>
            );
        } else {
            contentBar.push(
                <button class="clicked" onClick={() => props.updateFolder({folder: i})}>
                    {library[i]}
                </button>
            )
        }
    }
    return contentBar;
}

export default ContentBar;