import './OneEmail.css';
import back from './image/before.png';

function OneEmail(props) {
    let category = { 0: "Unsorted", 1: "Most Important", 2: "Less Important", 3: "Least Important", 4: "White-List" };
    
    let dropdown =
        <select name="selectCategory" value={props.selected_category} onChange={(e) => { props.update({ selected_category: e.target.value }); props.change_category(props.email_id, e.target.value); }}>
            {Object.keys(category).map((key) => (
                <option key={key} value={key}>{category[key]}</option>
            ))}
        </select>
    
    let structure = [dropdown,
        <button id='summary-button' onClick={() => props.get_summary()}>Get Summary</button>];
    
    if (props.email.ics === true) {
        structure.push(<button id='ics-button' onClick={() => props.get_ics(props.email_id)}>Add to Schedule</button>);
    }
    
    structure.push(<p id="email-subject">Subject: {props.email.subject}</p>);
    if (props.email.from_address === props.email.from_name) {
        structure.push(<p id="from">From: {props.email.from_address}</p>);
    } else {
        structure.push(<p id="from">From: {props.email.from_name} – {props.email.from_address}</p>)
    }


    if (props.email.cc !== undefined && props.email.cc.length > 0) {
        structure.push(<p id='cc'>CC: {props.email.cc}</p>)
    }

    if (props.email.bcc !== undefined && props.email.bcc.length > 0) {
        structure.push(<p id='bcc'>BCC: {props.email.bcc}</p>)
    }
    structure.push(<p id="email-body" dangerouslySetInnerHTML={{ __html: props.email.body }} />);

    return <div id="one-email">
        <img src={back} alt="return-img" id="return-img" onClick={() => props.go_back(props.email.category)} />
        {structure}
        
    </div>;
}

export default OneEmail;