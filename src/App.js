import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import $ from 'jquery';
import logo from "./logo.png";


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { login: 0, folder: "inbox", page: 1, total_num: -1 };
    this.updateLogin = this.updateLogin.bind(this);
  };

  updateLogin(login) {
    this.setState({ login: login });
  };

  render() {
    return (
      <MsalProvider instance={this.props.msalInstance}>
          <div id='top-bar'>
            <img src={logo} alt="logo" id="logo" />
            <input type="text" id="searchString"/>
            <LoginButton id="login-button"setLogin={this.updateLogin} />
          </div>

      </MsalProvider>
    )
  };
}
export default App;
