# Full-CRUD React Reference App WITH JWT AUTHENTICATION AND AUTHORIZATION BY POPULAR DEMAND

## READ THIS WHOLE DOCUMENT BEFORE CLONING AND RUNNING

## Coded lovingly by Jason SErafica

## Set Up

- Clone down this repo to your computer

- run `npm install` to download all of the needed dependencies

- make a `.env` file by running `touch .env`

- inside this .env file, set a SECRET variable to something cool like `SECRET=YASKWEEN` to sign your JWT tokens

- run `npm run build` to compile the react application into a `build` folder

- run `nodemon server.js` to start up the backend server on port:3001 and to listen to API interactions from the front-end

- open a new terminal tab or window and run `npm start` to start up the react development server

## High level overview of changes

- implemented a user model similar to react master mind

- created user API routes on back-end and userService.js in react utils folder to manage user creation and logging in

- React's state on `App.js` will now keep track of what user is logged in in the `state` object.

- React will not let you see some routes unless you are logged in

## SIGN UP AND LOG IN FLOW

- click the SIGN UP button in the navbar to complete the Sign Up Form

- BUG: On submitting the SIGN UP form, `this.props.history.push('/')` will not redirect you to the main page. However, the user will still be registered, and you can see nodemon returning a succesful status in the terminal. 

- I will try to fix above bug as soon as possible! Otherwise, the login/sign up flow is functional!

- click on the LOG IN button in the nav

- log in with your credentials

- if succesful, you should now be able to see your user's name on the page and in the state! And the NAVBAR should show you the routes to our cruddable puppies!

