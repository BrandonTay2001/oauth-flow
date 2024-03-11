import './OneEmail.css';
import back from './image/before.png';

function OneEmail(props) {

    let structure = [<p id="email-subject">{props.email.subject}</p>];

    if (props.email.from_address === props.email.from_name){
        structure.push(<p id="from">From: {props.email.from_address}</p>);
    } else {
        structure.push(<p id="from">From: {props.email.from_name} – { props.email.from_address}</p>)
    }

    structure.push(<p id="email-body" dangerouslySetInnerHTML={{ __html: props.email.body }} />);



    return <div id="one-email">

        <img src={back} alt="return-img" id="return-img" onClick={() => props.go_back()} />
        {structure}
        
    </div>;
}

export default OneEmail;