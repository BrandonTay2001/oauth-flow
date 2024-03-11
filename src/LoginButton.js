import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';


function LoginButton(props) {
  const { instance, accounts } = useMsal(); // basically everything with auth uses the instance from MSAL
  // accounts is an array of all the accounts that are signed in

  const handleLogin = async () => {
    const loginRequest = {
      // the scopes we need
      scopes: ["User.ReadBasic.All", "User.read", "Files.Readwrite.All", "Sites.Readwrite.All", "Mail.Read", "Mail.ReadBasic", 
      "Mail.ReadWrite", "MailboxSettings.Read"], // Add any additional scopes required by your application
    };

    try {
      // Open a popup for login
      let response = await instance.loginRedirect(loginRequest);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    const logoutRequest = {
      account: accounts[0], // Assuming there is only one signed-in account
    };

    props.update({emails: [], selected_email: -1, selected_content: {}, token: "", total_num: 0, login: 0, folder: 1, page: 1})

    instance.logoutPopup(logoutRequest);
  };
  
  useEffect(() => {

    let timer = setTimeout(() => {
      if (accounts.length === 0) {
        props.update({ login: 0, token: "", emails: [], total_num: -1 });
      } else {
        props.update({ login: 1 });
        if (props.token !== "") {
          props.getEmails(props.page, props.token);
        }
      }
    }, 2700000); // Change the delay to 45 minutes (2700000 milliseconds)
    return () => clearTimeout(timer);
    
  }, [accounts, props]);


  return (
    <div>
        {accounts.length === 0 ? ( 
        <button id="login-button" onClick={handleLogin}>Login</button>
      ) : (
        <div>
            <button id="login-button" onClick={handleLogout}>Logout</button>
          </div>
      )}
    </div>
  );
};

export default LoginButton;