import React from "react";

function preview(mail){
    return <text>{ mail.subject}</text>
};

const Emails = (emails) => {

    var pageSize = Math.min(emails.length, 50);
    var emailsList = [];

    for (var i = 0; i < pageSize; i++){
        emailsList.push(preview(emails[i]));
    }

    return <div>
        <>
            { emailsList }
        </>
    </div>
};

export default Emails;