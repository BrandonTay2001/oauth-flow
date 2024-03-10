import "./PageBar.css";
import before from "./image/before.png";
import next from "./image/next.png";

function PageBar(props) {

    let total_pages = Math.ceil(props.total_num / 50);
    
    let page_size = Math.min(50, props.total_num - (props.page-1)*50);

    let next_page = Math.min(total_pages, props.page + 1);
    let last_page = Math.max(1, props.page - 1);

    return <div id="page-bar">

        <img id="last-page" src={before} alt="before" onClick={() => props.updatePage(last_page, props.token)} />
        <p id="hint-page" >{(props.page - 1) * 50 + 1} - {(props.page - 1) * 50 + page_size} out of {props.total_num}</p>
        <img id="next-page" src={next} alt="next" onClick={() => props.updatePage(next_page, props.token)} />

    </div>;
    
}

export default PageBar;
