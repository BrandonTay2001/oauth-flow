import './EmailRow.css';

function EmailRow(props) {

    const months = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "July", 8: "Aug", 9: "Sept", 10: "Oct", 11: "Nov", 12: "Dec" };

    const year = props.date.getFullYear();
    const month = months[props.date.getMonth() + 1];
    const day = props.date.getDate();

    let subject = props.subject.substring(0, 40);

    if (props.subject !== subject) {
        subject = subject + " ...";
    }

    let preview = props.preview.substring(0, 100);

        if (props.preview !== preview) {
        preview = preview + " ...";
    }

    return <tr>
        <td id="sender">{props.sender}</td>
        <td id="subject">{subject}</td>
        <td id="preview">{preview}</td>
        <td id='date'>{`${month} ${day} ${year}`}</td>
    </tr>;
}

export default EmailRow;