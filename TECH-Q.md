1. What libraries for the frontend?

Like packages? React of course for the UI. Axios for HTTP requests. Immer for concise state updates in redux (main use for me). Clsx for dynamic class names. Redux for global state. TypeScript for typescript support and a better DX.

2. Command to start the app locally?

Once `yarn install` has been used in all three directories (backend, client, project working directory), you can start the app in development mode using `yarn start`.

Also, make sure the `.env` files are present. These are required for the app to function.

Another note: This app requires having Node 14 and up. That's because it has top-level async/await. I am using the latest LTS version of node (14.16.1) during development.

3. What's the most useful feature that was added to the latest version of your chosen language?

I don't know about the bleeding edge latest thing, but one of the most recent features I'm using is top-level async/await that comes with Node ^14.

4. How would you track down performance issues in production? Have you done this?

I would probably configure CloudWatch triggers or something. I have not had to do this personally.
