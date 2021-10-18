# Login-With-Google-OAuth2.0

This repository shows how to add 'Login with Google' to your Node Js app

## Technologies

This project was made with the following technologies:

<img alt="Node Js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img alt="Express" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img alt="JsonWebToken" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" /> <img alt="JsonWebToken" src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />


## How to run

- Clone the repository;
- Run `npm install` to download all dependencies;
- Create an `.env` file according to `.env.example`:
  - Use an hash md5 in JWT_SECRET;
  - You can create a credential in google in this [link](https://console.cloud.google.com/apis/credentials);
- Run `npm run dev` to start the application.
- Go to `http://localhost:9092`, login and open the console to copy the user's token;
- Use your preferred client api to make requests;
- In your client api preferably, create a request with post method for the `http://localhost:9092/login` route passing the token available on the console as `body param` in the key `token`;
  - In the response, copy the `accessToken`;
- Use the `accessToken` in the `http://localhost:9092/authenticated` route passing the token as `Bearer Token`;

### Get more information about the project by accessing my Notion Notes.
[<img alt="My notes about this project" src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" />](https://heather-scourge-972.notion.site/Google-OAuth2-Node-js-3a557c097f214d918986dad572d3127f)
