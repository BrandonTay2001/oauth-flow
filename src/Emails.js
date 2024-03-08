import './Emails.css';
import EmailRow from './EmailRow';

function Emails(props) {

    const emailRows = props.emails.map((e) => {

        const date = new Date(parseInt(e.time) * 1000);

        return <EmailRow sender={e.sender.name} subject={e.subject} preview={e.bodyPreview} date={ date} />
    });

    return emailRows;
}

export default Emails;