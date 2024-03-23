import './Emails.css';
import EmailRow from './EmailRow';

function Emails(props) {

    return <table>
        <thead>
            <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Preview</th>
                <th>Date</th>
            </tr>
        </thead>

        <tbody>
            {
                props.emails.map((e) => {
                    let date = new Date(parseInt(e.time) * 1000);
                    return <EmailRow key={e.key} sender={e.sender.name} subject={e.subject} preview={e.bodyPreview} date={date} getOneEmail={
                        props.getOneEmail} email_id={e.id} email_category={ e.email_category} token={props.token} />
                })
            }
        </tbody>

    </table>;
}

export default Emails;