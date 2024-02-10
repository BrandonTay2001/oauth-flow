import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import logo from "./logo.png";
import Protected from './Protected';
import Emails from './Emails';
import $ from 'jquery';


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

  getEmails(page, token){

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url:'http://localhost:5000/emails?page='+page,
      xhrFields: { withCredentials: true },
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token
      },
      success: function(res){
        this.setState({emails: res.emails, total_num: res.totalEmails});
      }
      }
    )
  }

  render() {
    return (
      <MsalProvider instance={this.props.msalInstance}>
          <div id='top-bar'>
            <img src={logo} alt="logo" id="logo" />
            <input type="text" id="searchString"/>
          <LoginButton id="login-button" updateLogin={this.update} updateToken={this.update} getEmails={ this.getEmails} token={this.state.token} />
        </div>
        <Protected updateToken={this.update} />
        
        
        {this.state.token !== "" && <Emails page={this.state.page} emails={this.state.emails} />}
      </MsalProvider>
    )
  };
}
export default App;
