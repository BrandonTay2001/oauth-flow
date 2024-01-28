import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useState, useEffect } from "react";
import $ from 'jquery';

function Protected() {
    const { instance, inProgress, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (!accessToken && inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
                // the scopes we need
                scopes: ["User.ReadBasic.All", "User.read", "Files.Readwrite.All", "Sites.Readwrite.All", "Mail.Read", "Mail.ReadBasic",
                    "Mail.ReadWrite", "MailboxSettings.Read"],
                account: accounts[0],
            };

            // example of acquiring a token (use the acquireTokenSilent to check cache first, then use acquireTokenPopup if not cached)
            // send the access token to Brandon's backend whenever calling an API!
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    // Acquire token silent success
                    let accessToken = accessTokenResponse.accessToken;
                    setAccessToken(accessToken);

                    // changed to fetch from ajax (commented out)
                    fetch('http://localhost:5000', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Token': accessToken
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    
                    // $.ajax({
                    //     type: 'POST',
                    //     dataType: 'json',
                    //     url: 'http://localhost:5000',
                    //     beforeSend: function (req) {
                    //         req.setRequestHeader('Access-Token', accessToken);
                    //     },
                    //     success: function (res) {
                    //         console.log(res);
                    //     }
                    // });
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
    }, [instance, accounts, inProgress, accessToken]);

    return accessToken;
}

export default Protected;