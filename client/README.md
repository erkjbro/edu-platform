# EDU Course Platform - Web Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

- components
  - admin
    - realtes to admin-specific pages
  - auth
    - login and signup
  - course
    - course-related pages and components
  - site
    - common site pages
  - student
    - student-related pages and components
  - ui-kit
    - UI components
  - user
    - user-related pages and components
- hooks
  - custom hooks; both for redux
- store
  - action creators
    - action logic
  - action types
    - types for actions and reducers
  - actions
    - typescript interfaces and types
  - reducers
  - index.ts
    - entry point for accessing the store from the rest of the app.
  - store.ts
    - store creation logic
- styles
  - global files for scss colors and variables
- index.tsx
  - entry point

## Dotenv

SASS_PATH
REACT_APP_BACKEND_URL

## Dependencies

- @testing-library/\*
  - testing
- @types/\*
  - TypeScript Definitions
- axios
  - http client
- clsx
  - dynamic css class names
- immer
  - create immutable state by mutating current state
- react
  - react
- react-dom
  - allows react to interact with dom
- react-redux
  - allows react to interact with redux
- react-router-dom
  - DOM bindings for react router usage
- react-scripts
  - run app scripts
- redux
  - store global state
- redux-devtools-extension
  - connect with browser extension
- redux-thunk
  - async redux
- typescript
  - typescript support
- web-vitals
  - pre-installed

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
