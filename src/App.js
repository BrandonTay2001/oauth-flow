import './App.css';
import React from 'react';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";
import logo from "./image/logo.png";
import Protected from './Protected';
import Emails from './Emails';
import OneEmail from './OneEmail';
import PageBar from './PageBar';
import ContentBar from './ContentBar';


class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = { login: 0, folder: 0, page: 1, total_num: 0, token: "", emails: [], selected_email: -1, selected_content: {},selected_category: "", clicked_time: 0 };
    
    this.update = this.update.bind(this);
    this.updatePage = this.updatePage.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
    this.getEmails = this.getEmails.bind(this);
    this.getOneEmail = this.getOneEmail.bind(this);
    this.returnFromOneEmail = this.returnFromOneEmail.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
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

  returnFromOneEmail(folder) {
    let time_spent = Math.round((Date.now() - this.state.clicked_time) / 1000);

    fetch('http://localhost:5000/metrics/recordTime/' + this.state.selected_email, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': this.state.token
      },
      body: JSON.stringify({"timeSpent": time_spent})
    })
      .then(response => response.json())
      .then(() => {
      this.setState({ folder: folder, selected_email: -1, selected_content: {}, clicked_time: 0});
      })
      .catch(error => {
        console.log(error);
    })
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
        console.log(data.emails);
      })
    .catch(error => {
      console.log(error);
    })
  }

  getEmailsByCategory(category, page, token) {
    fetch(`http://localhost:5000/emails/getByCategory?page=${page}&category=${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token
      }
    })
      .then(response => response.json())
      .then((data) => {
        if (data.emails !== typeof undefined) {
          this.update({ emails: data.emails, total_num: data.totalEmails, folder: category });
        } else {
          this.update({total_num: 0, folder: category });
        }
      })
      .catch(error => {
        console.log(error);
    })
  }

  getOneEmail(id, token) {
    this.update({ selected_email: id });

    fetch('http://localhost:5000/emails/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token
      }
    })
      .then(response => response.json())
      .then((data) => {

        let content = {};

        content["id"] = data.email.id;
        content["category"] = data.email.category;
        content["from_address"] = data.email.sender.address;
        content["from_name"] = data.email.sender.name;
        content["body"] = data.email.body;
        content["bcc"] = data.email.bcc;
        content["cc"] = data.email.cc;
        content["subject"] = data.email.subject;  
        this.update({ selected_content: content,selected_category: data.email.category, clicked_time: Date.now()});

      })
      .catch(error => {
        console.log(error);
    })
  }

  changeCategory( id, category) {
      fetch("http://localhost:5000/emails/changeCategory/" + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': this.state.token
        },
      body: JSON.stringify({"newCategory": category})
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        let content = this.state.selected_content;
        content["category"] = category;
        this.setState({ selected_content: content });
      })
      .catch(error => {
        console.log(error);
    })
  }

  render() {
    return (
      <MsalProvider id="App" instance={this.props.msalInstance}>
        
        {
          this.state.token === "" && <div id='login-page'>
            <img src={logo} alt='logo' id='login-logo' />
            <LoginButton id='login-button' update={this.update} getEmails={this.getEmails} token={this.state.token} page={this.state.page} />
          </div>
        }

        {this.state.token !== "" && <div id='top-bar'>
            <img src={logo} alt="logo" id="logo" onClick={ ()=>this.returnFromOneEmail(0)} />
             <input type="text" id="searchString"/>
          <LoginButton id="logout-button" update={this.update} getEmails={this.getEmails} token={this.state.token} page={this.state.page} />
        </div>}

        <Protected updateToken={this.update} getEmails={this.getEmails} page={this.state.page} />
        
        {this.state.token !== "" && this.state.selected_email === -1 && <ContentBar id="content-col" updateFolder={this.updateFolder} folder={this.state.folder} token={this.state.token} />}

        {this.state.token !== "" && this.state.selected_email === -1 && this.state.emails !== typeof undefined && <Emails id="email-col" page={this.state.page} emails={this.state.emails} token={this.state.token} getOneEmail={this.getOneEmail} />}
        
        {this.state.token !== "" && this.state.selected_email !== -1 && <OneEmail id="one-email" email={this.state.selected_content} email_id={this.state.selected_email} go_back={this.returnFromOneEmail} folder={this.state.folder} change_category={this.changeCategory} selected_category={this.state.selected_category} update={this.update} />}
        {this.state.token !== "" && this.state.selected_email === -1 && <PageBar id="page-bar" page={this.state.page} updatePage={this.updatePage} total_num={this.state.total_num} token={ this.state.token} />}
      </MsalProvider>
    )
  };
}
export default App;
