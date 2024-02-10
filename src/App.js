import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import logo from "./logo.png";


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { login: 0, folder: "inbox", page: 1, total_num: -1 };
    this.update = this.update.bind(this);
  };

  update(nextState) {
    this.setState(nextState);
  }

  render() {
    return (
      <MsalProvider instance={this.props.msalInstance}>
          <div id='top-bar'>
            <img src={logo} alt="logo" id="logo" />
            <input type="text" id="searchString"/>
            <LoginButton id="login-button" updateLogin={this.update} />
        </div>

      </MsalProvider>
    )
  };
}
export default App;
