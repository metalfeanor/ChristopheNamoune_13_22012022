# OPENCLASSROOMS PROJECT 13 - ARGENT BANK

A React app for managing a user Bank Account

## Dependencies

- [React](https://reactjs.org/) v17.0.2

- [react-router-dom](https://reactrouter.com/web/guides/quick-start) v6

- [React Redux](https://react-redux.js.org/) v7.2.6

- [Reduxjs/toolkit](https://redux-toolkit.js.org/) v1.7.1

- Recommended text editor: [Visual Studio Code](https://code.visualstudio.com/)

## Installation Dependencies

- You need [Git](https://git-scm.com/) to clone the repository

- You need [Node](https://nodejs.org/en/) to run the `npm` commands

- Or you need [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) (v1.22.17) to run `yarn` commands

## Install and run the project

- Clone the project to your computer

`git clone https://github.com/metalfeanor/ChristopheNamoune_13_22012022.git`

- Go to the project folder

`cd ChristopheNamoune_13_22012022`

- Install the packages

`npm i` or `yarn`

- Run the project (port 3000 by default)

`npm start` or `yarn start`

- To install the backend, go to api folder and install the packages

`cd api` and `npm i ` or `yarn`

- You can find more informations into the README

[Backend Repository](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API)

- You need to install mongoDB Community Server (Free installation) to run the server

- [MongoDB Community Server](https://www.mongodb.com/try/download/community) v5.0.6

## How it works ?

1 - The User need an email and password to login

2 - The App store email and password in a useState variable

3 - The App realize an Api request that required email and password transmitted into the body of the request

4 - If the user's email and password are found in database, the Api returns a Token

5 - The Token is stored into the redux store to Authorize further actions from the user such as modifying firstname or lastname

6 - When we got an Api Response, user is redirected into profile page using React-Router

7 - From Profile page, a user can modify firstname or lastname, consult his account and logout
