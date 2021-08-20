# Awesome Authentication Application

> This is an Authentication app 

![alt text](https://green-tech2510.slite.com/api/files/78Gkft0cQ/Screenshot%202021-08-19%20at%2010.25.48%20AM.png)

## Requirements : Here are the decisions and various tech I used to create the app.

- Node.js >= v12  but i have used v15
- Vue >= 3


## Application structure

- `src/` directory - Vue front end code.
- `server/` directory - Node.js back end code.
- `public/` directory - It will not be processed by webpacks. 

Created by webpack when you run the command `yarn run start`. The Node.js back end serves serves these assets using the
[`express.static`](https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express) middleware.

## Front End Folder Structure
```
└── src
    ├── _helpers
    │   ├── error-handle-response.js
    │   ├── useFormValidation.js
    ├── pages
    │   ├── Account.vue
    │   ├── AccountSubPage.vue
    │   ├── Home.vue
    │   ├── Login.vue   
    ├── routes
    │   ├── app-constants.js
    │   ├── error-constants.js
    |── App.vue
    |── main.js
    |── service.js
```
## Back End Folder Structure
```
    ├── controllers
    │   ├── user.js
    ├── middlewares
    │   ├── error-handler.js   
    ├── routes 
    │   ├── user.js
    |── validators
    │   ├── auth.js
    |── app.js
```

## Usage

```bash
# Install dependencies for front end and back end
yarn install

# Run Node.js back end server
yarn run server:start

API requests will be proxied to port 5000 automatically.

# Build front end assets with webpack
yarn run start

Check terminal for port and path details to view the app.

```
