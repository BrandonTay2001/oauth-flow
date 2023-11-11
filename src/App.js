import './App.css';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import React, { useEffect, useState } from 'react';
import Protected from './Protected';
import Emails from './Emails';
import Pages from './Pages';
const App = () => {

  const { emails, setEmails } = useState(null);
  const { page, setPage } = useState(1);


  function getAllEmails(pageInt = page){
    
    fetch("http://127.0.0.1:5000/emails/?page=" + pageInt, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': Protected(),
      }
    }).then(res => res.json())
      .then((resJson) => {
        const data = JSON.parse(resJson).emails;
        setEmails(data);
    }).catch(error => {
      console.log(error);
    })
  };
  
  return (
    <div>
      {emails === null &&  
        <div>
          <h1>Welcome to My App</h1>
          <LoginButton />
        </div>
      }

      {emails !== null &&
        <>
        <LoginButton />
        <Emails emails={emails} />
        <Pages pageNum={ 5} setPage={setPage}/>
        </>
        }
      
    </div>

  );
};

const AppWithMsal = ({ msalInstance }) => {
  return (
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  );
};

export default AppWithMsal;
