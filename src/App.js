import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import logo from "./image/logo.png";
import Protected from './Protected';
import Emails from './Emails';
import PageBar from './PageBar';
import ContentBar from './ContentBar';


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { login: 0, folder: 0, page: 1, total_num: 0, token: "", emails: [], selected_email: -1 };
    
    this.update = this.update.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
    this.getEmails = this.getEmails.bind(this);
    this.getOneEmail = this.getOneEmail.bind(this);
  };

  update(nextState) {
    this.setState(nextState);
  }

  updatePage(page, token) {
    this.setState({ page: page });
    
    if (this.state.folder === 0) {
      this.getEmails(page, token);
    } else {
      this.getEmailsByCategory(page, this.state.folder, token);
    }
  }

  updateFolder(folder, token) {
    this.update({ folder: folder });

    if (folder === 0) {
      this.getEmails(1, token);
    } else {
      this.update({ page: 1 });
      this.getEmailsByCategory(folder, 1, token);
    }
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
        this.update({ emails: data.emails, total_num: data.totalEmails });
      })
    .catch(error => {
      console.log(error);
    })
  }

  getEmailsByCategory(category, page, token) {
    fetch(`http://localhost:5000/emails/getByCategory?page=${page}&category=${category}`, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Access-Token': token
      }
    })
      .then(response => response.json())
      .then((data) => {
        this.update({ emails: data.emails, total_num: data.totalEmails, folder: category });
      })
      .catch(error => {
        console.log(error);
    })
  }

  getOneEmail(id, token) {
    this.update({ selected_email: id });

    fetch('http://localhost:5000/emails/' + id, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Access-Token': token
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.emails);
      })
      .catch(error => {
        console.log(error);
    })
  }

  render() {
    return (
      <MsalProvider id="App" instance={this.props.msalInstance}>
          <div id='top-bar'>
            <img src={logo} alt="logo" id="logo" />
            <input type="text" id="searchString"/>
          <LoginButton id="login-button" update={this.update} getEmails={this.getEmails} token={this.state.token} page={this.state.page} />
        </div>
        <Protected updateToken={this.update} getEmails={this.getEmails} page={this.state.page} />
        
        {this.state.token !== "" && <ContentBar class="col-1" id="content-col" updateFolder={this.updateFolder} folder={this.state.folder} token={this.state.token} />}

        {this.state.token !== "" && this.state.emails !== typeof undefined && <Emails class="col-2" id="email-col" page={this.state.page} emails={this.state.emails} token={this.state.token} getOneEmail={ this.getOneEmail} />}
        
        {this.state.token !== "" && <PageBar id="page-bar" page={this.state.page} updatePage={this.updatePage} total_num={this.state.total_num} token={ this.state.token} />}
      </MsalProvider>
    )
  };
}
export default App;
