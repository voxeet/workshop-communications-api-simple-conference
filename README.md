### Build a simple conference application with Dolby.io, Cloudinary and Netlify.

This is a **TWO PART** workshop. in **PART ONE** one we will build a token service, and in **Part TWO** we will build and deploy a simple video conference app that demonstrates a simple video conference, participants list with avatars, mic and video controls, screensharing and recording with Dolby.io Communications APIs. Avatars in this demo are hosted and transformed with Cloudinary, and the GitHub auto-deployment workflow is managed on Netlify.  

### Part 1 -  Simple Token Service
#### Set up a token service to quickly authenticate the we'll build in part TWO.
> **Note**: 
> To run this example; You will be required to setup a token
> service.

We're going to create a serverless function to satisfy that token service requirement. This token server example is targeted for deployment with Netlify Functions. The primary function may adapted for other function as a service on other platforms.  Using a token for [initialization](https://docs.dolby.io/communications-apis/docs/initializing-javascript) of our SDK follows our best practice for securing your application.

Follow the instructions at this [repo](https://github.com/dolbyio-samples/communications-api-token-server-netlify) .

Configuration of the serverless token server example should take just a few minutes.

>Note: Pushing changes to your repository will autromatically trigger a fresh deployment in Netlify.


### Part 2 -  Simple Video Conference app
#### Lets get this app up and running:
Simple Video Conference App:

[![Deploy To Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dolbyio-samples/workshop-communications-api-simple-conference)

- Clone and deploy this Simple Video Conference App by clicking the deploy button above; This will set this all up for you, taking you to your new project admin in Netlify.
    
-   Netlify will ask you to authenticate with GitHub; then clone this repo to your GitHub ORG/ Account and setup automatic deployment to a Netlify server environment. 
-   Once it has deployed, you’ll find your project’s URL at the top of the site overview page in your Netlify admin, and you’ll be able to visit it and navigate to the Simple Video Conference app.

>**Note**: At first run the app will fail to work; We need to change the tokenServerURL to point to the url of your token server you created in the first part.

- You can clone your repo locally*  or simply click on the GitHub Link in the Netlify Admin console under the current deployment, this will bring you to your repo; There you can navigate to the www folder and edit the client.js file.
- On Line 16: replace the value with your own token server URL.
```
const tokenServerURL = 'Enter the url to your token server here';
```

Replace 'Enter the url to your token server here' with your url you've copied from the browser window. 

-  Save and push the change and Netlify will automatically pull and deploy a the new, working versions of our Simple Conference app version. 


*Clone the repo and work on it locally:
```
git clone <your name or repo organization> /workshop-communications-api-simple-conference
```

```
cd workshop-communications-api-simple-conference
```

###  Simple Conference App Features:
- Conference Alias - set the name of the conference - default:  dev-portal  
- Join Button  - Create a conference
- Start / Stop Video
- Start / Stop Audio - off by default
 - Start / Stop Screen Sharing
- Start / Stop Recording - by default this app is setup for live record.   

### Accessing recordings
You can learn more about recording in our [recording](https://docs.dolby.io/communications-apis/docs/guides-recording-mechanisms) documentation. 
The conference recordings are available in the  [dashboard](https://dolby.io/dashboard/applications/summary), via  [Recording.Audio.Available](https://docs.dolby.io/communications-apis/docs/webhooks-events-recordingaudioavailable)  or  [Recording.MP4.Available](https://docs.dolby.io/communications-apis/docs/webhooks-events-recordingmp4available) webhook events, or  [REST APIs](https://docs.dolby.io/communications-apis/reference/recordings). For more information, see the  [Recording](https://docs.dolby.io/communications-apis/docs/recording-javascript)  document.
