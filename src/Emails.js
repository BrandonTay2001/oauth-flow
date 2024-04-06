import './Emails.css';
import EmailRow from './EmailRow';

function Emails(props) {

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm bg-white p-3 m-3 rounded">
                            <thead className="table-fixed border-b font-medium dark:border-neutral-500 bg-gray-100">
                                <tr className="border-b dark:border-neutral-500">
                                    <th className="px-6 py-4">Sender</th>
                                    <th className="px-6 py-4">Subject</th>
                                    <th className="px-6 py-4">Preview</th>
                                    <th className="px-6 py-4">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    props.emails.map((e) => {
                                        let date = new Date(parseInt(e.time) * 1000);
                                        return <EmailRow key={e.key} sender={e.sender.name} subject={e.subject} preview={e.bodyPreview} date={date} getOneEmail={
                                            props.getOneEmail} email_id={e.id} email_category={e.email_category} token={props.token} />
                                    })
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Emails;