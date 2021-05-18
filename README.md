# EDU Course Platform

Welcome! The EDU Course Platform has been built using the **MERN stack** and **TypeScript**.

I just started working with **TypeScript** a few weeks ago, and I used this project as a way to increase my familiarity with its usage. I also made use of **Sass** for the frontend stylesheets, but I have used this a bit before.

The purpose of this application is to provide an admin panel for managing a platform for educational courses. For the sake of simplicity, I have made it so that users can sign up as admins as long as they provide the **admin code of 424242**. Yes, I took this from Stripe.

# Get started

- Clone the project.
- `yarn install`: Install all dependencies. Be sure to do this in the project root and also the `backend` and `client`.
- `yarn start`: Start the project for development

# Project structure & architecture

**Dependencies:**

- [x] concurrently: Allows a user to start the project from the _pwd_ using the command `yarn start`.

**Project Structure:**

EDU Platform is being developed with a monolithic structure for the sake of simplicity. The _React_ web client is stored in the `client` directory, and the _Node.js_ rest api is in the `backend` directory. There will be more details about the structure of each component within their respective directories.

See the `backend` and `client` directories for more information. The backend and client both require `.env` files in order to function.

# Pages

### Guests

- Landing Page
- Auth

### Students

- Student Dashboard
- Course Details

### Admins

- Admin Console
  - Courses Tab
  - Users Tab
- Course Details
- Creat Course
- Edit Course (Same as Create)
- User Details
- Create User
  > Didn't implement patch or delete for users due to time constraints.

# Features

### API

- Get Users
- Get Users By Role
- Get User By Id
- Post User
- Get Courses
- Get Course By Id
- Post Course
- Patch Course
- Delete Course
- Signup
- Signup (Auth)
- Login
- 404 Route
- 500 Route

### Client

- Auth Timeout (3h)
- Mobile-First UI Design

# DevOps Info

> Development, Staging, and Production Info?

Nothing setup yet. Planning to use AWS Amplify for the frontend and AWS EB for the backend. I'll share a link once the project is live.

# Collaborators

| Name         | Role       | Contact                 | Timezone    |
| ------------ | ---------- | ----------------------- | ----------- |
| Erik J Brown | Everything | erkjbro@erikjbrown.tech | USA (GMT-5) |
