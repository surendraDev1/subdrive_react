Suguna cars notes:
install node,
 npm install -g npm@latest
for routing: npm install react-router-dom @types/react-router-dom,  npm install react-router-dom
install axios for location  npm install axios   , npm install @types/axios, 
install  keycloak-js @react-keycloak/web for login.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


# Steps to Launch the Application

1. **Download the Required Packages:**
   - Clone the following packages to your local machine:
     - `subdrive-react`
     - `subdrive_backend_service`
     - `api_gateway_service_subdrive`

2. **Set Up Keycloak:**
   - Follow the instructions in this document to configure Keycloak: 
     [Keycloak Configuration Guide](https://subdrive3rentals.atlassian.net/wiki/spaces/~712020ec3daae59c2d4b53b467e689f919e45d/pages/8224770/KeyCloak+-+Identity+Access+Management+IAM)

3. **Access Keycloak:**
   - Once the container is running, Open your browser and navigate to `http://localhost:8080`to configure keycloak by following above documentation.
   - Log in using the credentials:
     - **Username:** admin
     - **Password:** admin

4. **Start Backend Services:**
   - Launch the following applications:
     - `api_gateway_service_subdrive`
     - `subdrive_backend_service`

5. **Run the Frontend Application:**
   - Once the backend services are up and running, execute the following command in your frontend application directory:
     ```bash
     npm start
     ```

6. **Authenticate and Redirect:**
   - Click on the Login button in the frontend application. You will be redirected to Keycloak for authentication.
   - Use the credentials of the user created in the Keycloak realm to log in.
   - After successful authentication, you will be redirected back to the application.

 7. **Added Material ui**

 git push from a dev branch from different user

