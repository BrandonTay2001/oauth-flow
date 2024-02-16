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

    instance.logoutPopup(logoutRequest);
  };
  
  useEffect(() => {

    let timer = setTimeout(() => {
      if (accounts.length === 0) {
        props.updateLogin({ login: 0 });
        props.updateToken({ token: "" });
      } else {
        props.updateLogin({ login: 1 });
        if (props.token !== "") {
          props.getEmails(props.page, props.token)
        }
      }
    }, 60000)
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