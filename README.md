# EDU Course Platform

Welcome! The EDU Course Platform has been built using the **MERN stack** and **TypeScript**.

I just started working with **TypeScript** a few weeks ago, and I used this project as a way to increase my familiarity with its usage. I also made use of **Sass** for the frontend stylesheets, but I have used this a bit before.

The purpose of this application is to provide an admin panel for managing a platform for educational courses. For the sake of simplicity, I have made it so that users can sign up as admins as long as they provide the **admin code of 424242**. Yes, I took this from Stripe.

# Get started

- Clone the project.
- `yarn install`: Install all dependencies. Be sure to do this in the project root and also the `backend` and `client`.
- `yarn start`: Start the project for development

```bash
pwd/backend: yarn install
pwd/client: yarn install
pwd/: yarn install
pwd/: yarn start
```

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

Web client is hosted using AWS Amplify at [elearning.erkjbro.com](https://elearning.erkjbro.com/)

It's deployed automatically whenever updates are pushed to the `main` branch.

Public API is hosted using EB CLI at [elarning.erkjbro.io](https://elearning.erkjbro.io/)

It has to be manually deployed from the cli using `eb deploy`. I set the envars using eb, created an environment in us-east-2, added an ALB, created an SSL certificate, and setup an alias in Route 53 using the certificate so that the API can take traffic on port 443.

Database is hosted using MongoDB Atlas

Dev and Prod both point to the same cluster but different databases.

# Summary of what was built and not built

The focus was on having an admin panel and demonstrating CRUD operations with a mobile-first api. It's also my first time using typescript for a full-stack app so I had to cut some corners for time. I created CRUD operations for courses, allowed student and admin signup, user creation, and ways to view lists and details for courses and users.

I made a button for course enrollment but I did not implement it. It's just to demonstrate the expected behavior.

# Context decisions on framework choices

I went with the MERN stack because there wasn't time to try and learn React Native and Postgres all within a week. I'm more comfortable with the MERN stack and I also wanted to try experimenting with TypeScript while under pressure to deliver.

React & Redux
Node & Express
MongoDB

# Areas for improvements

I started using TypeScript just a few weeks ago, so there are a lot of areas that could be improved so that this application is strongly typed.

Also, this was somewhat rushed. I don't think having admin signup and login intermingled with the general user area is a good practice. With more time I would probably develop a separate admin-only client. It would be useful to have react native clients too.

Socket IO would be helpful too. For example, a student could be viewing their courses and then get a notification and updated list when an admin assigns a new course to them.

- Client
  - testing
  - stronger typing
  - form validation
  - reusable list structures
  - convert to a microfrontend or separate web/mobile apps
  - more usage of redux (it only handles auth atm)
  - develop course creation
  - add teachers...? or TA's to assist students
  - profile management for passwords, etc.
  - students enroll in courses
  - course content! There's nothing to do in the app yet once enrolled in a course.
  - user data should be more robust. phone number, location, language preference, etc.
- API
  - testing
  - stronger typing
  - express validation
  - dockerize
  - microservice or SAM perhaps? could be serverless. monolithic apps aren't exactly scalable.

# Collaborators

| Name         | Role       | Contact                 | Timezone    |
| ------------ | ---------- | ----------------------- | ----------- |
| Erik J Brown | Everything | erkjbro@erikjbrown.tech | USA (GMT-5) |
