import './App.css';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import { useState } from 'react';
import Protected from './Protected';

const App = ({ msalInstance }) => {

  const { emails, setEmails } = useState(null);
  const { page, setPage } = useState(1);


  getAllEmails(){
    fetch("http://www.localhost:3001/emails/page=" + this.state.page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': Protected(),
      }
    }).then(response => {
      setEmails(response.emails);
    }).catch(error => {
  console.log(error);
    })
  }

  return (
    <div>
     <MsalProvider instance={msalInstance}>
      <div>
        <h1>Welcome to My App</h1>
        <LoginButton />
      </div>
  </MsalProvider>
      
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
