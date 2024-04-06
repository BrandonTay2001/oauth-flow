# Example of acquiring a Microsoft token for React through OAuth2
Once we acquire the MSAL token, pass it to backend APIs that Brandon will make :)

## Important stuff
1. In index.js, the auth object has already been configured in Azure so just use those credentials following this example
2. Default is port 3000, if we need to change this let Brandon know so he can reconfigure the Azure AD stuff
3. This example only works with HTTP, if we are deploying to prod or using ngrok we need to reconfigure Azure too :(
4. To run: npm run start
5. Packages install: npm install
6. npm version: 14
