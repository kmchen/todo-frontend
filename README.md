# TODO Frontend

### Description

This service is the frontend for getting and manipulating the todo task

### What's new after the first interview

- Use Zustand as state management tool
- Use Cypress to perform ui test

### Tech stack

- Typescript
- React
- Zustand
- Cypress

### Table of Contents

- [Install](#install)
- [Usage](#usage)
- [UI Test](#ui)
- [API](#api)

### Install

Yarn is required to install and handle dependencies

```
$ npm install --global yarn
```

**Install dependencies and run**

```sh
$ cd todo-frontend
$ yarn
```

### Usage

To run the app in dev mode with hot reload

```sh
$ yarn dev
```

### ui

To run ui test, please run redis, todo-backend and todo-frontend ervices first

```
$ cd todo-frontend
$ docker-compose -f docker-compose-backend.yml up # Run redis and todo-backend
$ yarn dev #Run todo-frontend
$ yarn test:ui
```

### API

Frontend is running at

```
http://localhost:5173
```
