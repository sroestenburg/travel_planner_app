# Evaluating a news article with Natural Language Processing project

For this project I used webpack to bundle all my dependancies and created a news article website with natural language processing.

## Install webpack

I first installed express, corse, bodyparser, and webpack with all necessary loaders and plugins.

```javascript
"devDependencies": {
    "@babel/core": "^7.12.17",
    "@babel/preset-env": "^7.12.17",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.2",
    "html-webpack-plugin": "^3.2.0",
    "jest": "^26.6.3",
    "mini-css-extract-plugin": "^1.3.8",
    "node-sass": "^5.0.0",
    "optimize-css-assets-webpack-plugin": "^5.0.4",
    "sass-loader": "^10.1.1",
    "style-loader": "^2.0.0",
    "terser-webpack-plugin": "^4.2.3",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.2",
    "webpack-merge": "^5.7.3",
    "workbox-webpack-plugin": "^6.1.1"
  }
  ```
## Setting up the API

For this project I used the `meaningcloud Sentiment Analysi API`

### Step 1: Signup for an API key
You can find the API [here](https://www.meaningcloud.com/developer/sentiment-analysis). Once you create an account with MeaningCloud, you will be given a license key to start using the 


### Step 2: Environment Variables
Next I declared the API key in the server.js file
```javascript
// set API credentials
const textApi = {
    application_key: process.env.API_KEY
};
```
### Note
...but there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly are never a good thing. So, we have to figure out a way to make that not happen. The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold a value, but these variables only belong to your system and won't be visible when you push to a different environment like Github.

- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
```
API_KEY=**************************
```
- [ ] Add this code to the very top of your server/index.js file:
```javascript
const dotenv = require('dotenv');
dotenv.config();
```
- [ ] Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```javascript
console.log(`Your API key is ${process.env.API_KEY}`);
```

### Now you are ready to go!

## Next


- I Parsed the response body to dynamically fill content on the page.
- Tested that the server and form submission work, making sure to also handle error responses if the user input does not match API requirements.
```javascript
function displayErrorMsg() {
    let message = "<p>The URL is invalid. Make sure the URL is correct, and try again.</p>"
    let errorMsg = document.getElementById("errorMsg");
    errorMsg.innerHTML = message;
};
```
## Added the setup for service workers. 
 * at the bottom of the html file:
```javascript
         // Check that service workers are supported
           if ('serviceWorker' in navigator) {
               // Use the window load event to keep the page load performant
               window.addEventListener('load', () => {
                   navigator.serviceWorker.register('/service-worker.js');
               });
           }
  ```
  * in the webpack.prod.js 
  ```javascript
  const WorkboxPlugin = require('workbox-webpack-plugin');
  plugins: [
        new MiniCssExtractPlugin({ 
            filename: "[name].css",
        }),
        new WorkboxPlugin.GenerateSW()
    ]
  ```
- Tested that the site is now available even when you stop your local server

## Test suite
### Installed the `jest` framework to run some unit tests
```javascript
 Test Suites: 2 passed, 2 total
 Tests:       6 passed, 6 total
 Snapshots:   0 total
 Time:        14.452 s
 Ran all test suites.
```

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.




