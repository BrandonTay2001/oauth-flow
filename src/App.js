import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import logo from "./logo.png";
import Protected from './Protected';


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { login: 0, folder: "inbox", page: 1, total_num: -1, token: "" , email: []};
    this.update = this.update.bind(this);
  };

  update(nextState) {
    this.setState(nextState);
  }

  getEmail() {
    fetch(`$http://localhost:5000/email?page=${this.state.page}`, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': this.state.token
        }
    })
    .then(response => response.json())
    .then(data => {
      this.update({total_num: data.totalEmails, email: data.emails});
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
            <LoginButton id="login-button" updateLogin={this.update}/>
        </div>
        <Protected updateToken={this.update} />
      </MsalProvider>
    )
  };
}
export default App;
