import './Emails.css';
import EmailRow from './EmailRow';

function Emails(props) {

    return <table>

        <tr>
            <th>Sender</th>
            <th>Subject</th>
            <th>Preview</th>
            <th>Date</th>
        </tr>
        {
            props.emails.map((e) => {
                let date = new Date(parseInt(e.time) * 1000);
                return <EmailRow sender={e.sender.name} subject={e.subject} preview={e.bodyPreview} date={date} onClick={() => {
                    props.getOneEmail(e.id, props.token) }} />
            })
        }
    </table>
}

export default Emails;