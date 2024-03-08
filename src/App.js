import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import logo from "./image/logo.png";
import Protected from './Protected';
import Emails from './Emails';
import PageBar from './PageBar';
import ContentBar from './ContentBar';
// import $ from 'jquery';


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { login: 0, folder: 0, page: 1, total_num: 0, token: "", emails: [], selected_email: -1 };
    
    this.update = this.update.bind(this);
    this.getEmails = this.getEmails.bind(this);
  };

  update(nextState) {
    this.setState(nextState);
  }

  getEmails(page, token) {
    fetch('http://localhost:5000/emails?page=' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.emails, data.totalEmails);
        this.update({ emails: data.emails, total_num: data.totalEmails });
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
          <LoginButton id="login-button" updateLogin={this.update} updateToken={this.update}  getEmails={this.getEmails} token={this.state.token} page={this.state.page} />
        </div>
        <Protected updateToken={this.update} getEmails={this.getEmails} page={this.state.page} />
        
        {this.state.token !== "" && <ContentBar id="content-col" updateFolder={this.update} folder={this.state.folder} />}
        {this.state.token !== "" && <Emails id="email-col"page={this.state.page} emails={this.state.emails} token={ this.state.token} />}
        {this.state.token !== "" && <PageBar id="page-bar" page={ this.state.page} updatePage={this.update} total_num={ this.state.total_num} />}
      </MsalProvider>
    )
  };
}
export default App;
