import './Emails.css';
import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";


function Emails(props) {

    const { instance, inProgress, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    const emails = [{ id: 1, subject: "fml", bodyPreview: "fuck my life", sender: "myself", time: "1708025595" },
    { id: 2, subject: "e", bodyPreview: "f", sender: "g", time: "1708025009" }];

    useEffect(() => {
        if (!accessToken && inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                // the scopes we need
                scopes: ["User.ReadBasic.All", "User.read", "Files.Readwrite.All", "Sites.Readwrite.All", "Mail.Read", "Mail.ReadBasic",
                    "Mail.ReadWrite", "MailboxSettings.Read"],
                account: accounts[0],
            };

            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    // Acquire token silent success
                    let accessToken = accessTokenResponse.accessToken;
                    setAccessToken(accessToken);
                    props.updateToken({ token: accessToken });
                    
                    console.log(accessToken)

                    fetch('http://localhost:5000/health', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Token': accessToken,
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    
                })
                .catch((error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance
                            .acquireTokenPopup(accessTokenRequest)
                            .then(function (accessTokenResponse) {
                                // Acquire token interactive success
                                let accessToken = accessTokenResponse.accessToken;
                                setAccessToken(accessToken);
                            })
                            .catch(function (error) {
                                // Acquire token interactive failure
                                console.log(error);
                            });
                    }
                    console.log(error);
                });
        }

    }, [instance, accounts, inProgress, accessToken, props]);
    
    const emailRows = emails.map((e) => {

        const date = new Date(parseInt(e.time) * 1000);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return <div>
            <text>{e.sender} {e.subject} {e.bodyPreview} {`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`}</text>
            <text>{ props.emails}</text>
        </div>
    });

    return emailRows;
}

export default Emails;