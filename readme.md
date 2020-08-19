# Interview Tutorial API

> An implementation of with Node/Express.

## Features

* User signup
* User sign in (using JWT)
* Post interview Question (authenticated user)
* View interview Questions
* Edit interview Questions(authenticated user)
* Delete interview Questions(authenticated user)
* Upvote or downvote answers (authenticated user)
* Answer Question (authenticated user)
* Search Questions

## Stack

* NodeJs with express
* Authentication with jsonwebtoken
* MongoDB database
* Documentation with Swagger

## Installing / Getting started

```shell
git clone https://github.com/MakeSchool-Tutorials/Interview-Tutorial-API.git
cd Interview-Tutorial-API
npm install
npm run start-dev # prints Listening on port $portnumber
```

### Building

```shell
npm build # build project for prod
npm start # starts project in prod mode
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

The project enforces eslint airbnb code style.

## Routes

### auth

| Route | Method | Access | Description |
| ----------- | ----------- | ----------- | ----------- |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/auth/signup> | POST | Public |sign up a new user |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/auth/signup> | POST | Public | sign in as a user |

### questions

| Route | Method | Access | Description |
| ----------- | ----------- | ----------- | ----------- |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/question/getAllQuestions> |GET| Private | Gets all questions |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/question/postQuestion> | POST | Private | ask a question as a user already signed in |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/question/updateQuestion/{userId}/{questionId>} | PUT | Private | edit your question as a user already signed in |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/question/deleteQuestion/{userId}/{questionId>} | DELETE | Private | delete your question as a user already signed in |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/question/search?title=searchquery> | GET | Public | search for a question |

### user

| Route | Method | Access | Description |
| ----------- | ----------- | ----------- | ----------- |
| <https://obscure-tundra-14794.herokuapp.com/api/v1/user/getAllUsers> | GET | Private | get all users registeres |
