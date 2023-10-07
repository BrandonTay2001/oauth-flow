import './App.css';
import LoginButton from './LoginButton';
import { MsalProvider } from "@azure/msal-react";

const App = ({msalInstance}) => {
  return (
    <MsalProvider instance={msalInstance}>
      <div>
        <h1>Welcome to My App</h1>
        <LoginButton />
      </div>
    </MsalProvider>
  );
};

export default App;
