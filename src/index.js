import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { PublicClientApplication } from '@azure/msal-browser';

// for more info look at: https://www.npmjs.com/package/@azure/msal-react
const pca = new PublicClientApplication({
  auth: {
    clientId: '4a692852-f769-48f8-a33a-ac5580f70625', // the application ID of the app we registered in Azure
    authority: 'https://login.microsoftonline.com/common',  // keep this the same
    redirectUri: 'http://localhost:3000', // where we redirect to after users login
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App msalInstance={pca} />  {/* pass the instance of the PCA to the App component */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
