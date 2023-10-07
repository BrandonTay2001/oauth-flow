import {
    InteractionRequiredAuthError,
    InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import React, { useState, useEffect } from "react";

function Protected() {
    const { instance, inProgress, accounts } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        if (!accessToken && inProgress === InteractionStatus.None) {
            const accessTokenRequest = {
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

    return <p>Return your protected content here: {accessToken}</p>;
}

export default Protected;