import './App.css';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import React, { useEffect, useState } from 'react';
import Protected from './Protected';
import Emails from './Emails';


const App = ({ msalInstance})=> {
  const [emails, setEmails] = useState(null);
  const [page, setPage] = useState(1);

  function handlePage(pageInt) {
    setPage(pageInt);
    getAllEmails();
  }

  function handleEmails(emails) {
    setEmails(emails);
  }

  function getAllEmails() {
    fetch("http://127.0.0.1:5000/emails/?page=" + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': Protected(),
      }
    }).then(res => res.json())
      .then((resJson) => {
        const data = JSON.parse(resJson).emails;
        handleEmails(data);
    }).catch(error => {
      console.log(error);
    })
  };

  const Pages = ({ pageNum }) => {
  var pages = [];
  var page = -1;
  pageNum === null ? page = 5 : page = pageNum;

  function addPages(pageInt) {
    return <button onClick={(e) => handlePage(e.target.value)}>
            {pageInt}
    </button>;
  }

  for (var i = 1; i <= page; i++) {
    pages.push(addPages(i));
  }
  return <div className="pageRow" >{pages}</div>;
};

  return (
    <MsalProvider instance={ msalInstance}>
      <>
        <LoginButton />
        <Emails emails={emails} />
        <Pages pageNum={5} getAllEmails={getAllEmails} />
      </>
    </MsalProvider>
  );
};

export default App;