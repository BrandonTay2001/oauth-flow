import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import logo from "./logo.png";
import Protected from './Protected';
import Emails from './Emails';
// import $ from 'jquery';


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { login: 0, folder: "inbox", page: 1, total_num: -1, token: "" , emails: [], selected_email: -1};
    this.update = this.update.bind(this);
    this.getEmails = this.getEmails.bind(this);
  };

  update(nextState) {
    this.setState(nextState);
  }

  getEmails(page, token) {
    fetch('http://localhost:5000/emails?page='+page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({ emails: data.emails, total_num: data.totalEmails });
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <MsalProvider instance={this.props.msalInstance}>
        <div id='top-bar'>
          <img src={logo} alt="logo" id="logo" />
          <input type="text" id="searchString"/>
          <LoginButton id="login-button" />
        </div>

        {/* rendered when the user is authenticated */}
        <AuthenticatedTemplate>
          <Emails page={this.state.page} updateToken={this.update} />
        </AuthenticatedTemplate>
      
        <UnauthenticatedTemplate>
          <h1>Please sign in to continue</h1>
        </UnauthenticatedTemplate>
      </MsalProvider>
    )
  };
}
export default App;
