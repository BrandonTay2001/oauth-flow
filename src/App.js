import './App.css';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import React, { useState } from 'react';
import Protected from './Protected';
import Emails from './Emails';

const App = () => {

  const { emails, setEmails } = useState(null);
  const { page, setPage } = useState(1);


  const getAllEmails = () => {
    fetch("http://127.0.0.1:5000/emails/?page=" + this.state.page, {
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
        <Emails emails={emails}/>
        </>
        }
      
    </div>
   
  );
};

const AppWithMsal = ({ msalInstance }) => {
  return (
    <MsalProvider instance={msalInstance}>
      <App msalInstance={msalInstance} />
    </MsalProvider>
  );
};

export default AppWithMsal;
