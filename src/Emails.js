import './Emails.css';


function Emails(props) {
    const emails = [{ id: 1, subject: "fml", bodyPreview: "fuck my life", sender: "myself", time: "1708025595" },
    { id: 2, subject: "e", bodyPreview: "f", sender: "g", time: "1708025009" }];
    
    const emailRows = emails.map((e) => {

        const date = new Date(parseInt(e.time) * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return <div>
            <text>{e.sender} {e.subject} {e.bodyPreview} {`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`}</text>
            <text>{ props.emails}</text>
        </div>
    });

    return emailRows;
}

export default Emails;