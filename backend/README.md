# EDU Course Platform - REST API

Built using Node, Express, and TypeScript.

## Environment

Note! This app was developed to run with **node@14.16.1**. It requires _^14_ so that top-level async/await is available.

Also, create a `.end.development` file in the backend directory and populate it with the required ENVARS. See below.

## Endpoints

- Get Users: /api/users

Fetch all users.

- Get Users By Role: /role/:userRole

Fetch users according to their role. Accpets 'student' or 'admin' (for now).

- Get User By Id: /:userId

Fetch user matching specified ID.

- Post User: /admin/create-user

Endpoint for Admins to create new users.

- Get Courses: /

Fetch all courses.

- Get Course By Id: /:courseId

Fetch course matching specified ID.

- Post Course: /

Create new course. Only admins.

- Patch Course: /:courseId

Edit course. Only admins.

- Delete Course: /:courseId

Delete course. Only admins.

- Signup: /signup

Create new account.

- Signup (Auth): /signup/:adminCode

Create new admin account.

- Login: /login

Login to get a JWT.

- 404 Route

Routes not found.

- 500 Route

Handles errors.

## Dotenv

NODE_ENV
PORT
MONGODB_URI
JWT_KEY

## Dependencies

- @types/\*
  - TypeScript Definitions
- typescript
  - TypeScript
- bcryptjs
  - Encryption
- cors
  - CORS headers
- dotenv
  - Environment Variables
- express
  - Middleware
- express-validator
  - Middleware Validation
- jsonwebtoken
  - Authentication Token
- mongoose
  - ODM for MongoDB
- mongoose-unique-validator
  - Validation for Mongoose
- mocha / chai / sinon
  - Testing use

## devDependencies

- concurrently
  - Run commands concurrently. For the backend it's used to run tsc and nodemon together.
- nodemon
  - Node Demon that watches for file changes so I don't have to constantly restart the server.

## Available Scripts

- test
  - [reserved for tests]
- start:build
  - tsc -w
- start:run
  - DOTENV_CONFIG_PATH=.env.development nodemon -r dotenv/config dist/index.js
- start:dev
  - concurrently yarn:run:start\*
- prestart
  - compile typescript
- start
  - run app for production

## Notes

The backend api isn't finished, but it demonstrates CRUD opeations and the primary functionality needed for the app.
