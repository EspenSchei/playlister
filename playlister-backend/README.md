# Playlister-backend
This project contains all the backend code for the Playlister project.

## Before you start
Before this application can be deployed, you need to create a `config.properties` file and place it under 
`playlister-backend/src/main/resources`, or make sure to pass the environment variables are parameters.

The following variables needs to be included:
```
clientId=<YourSpotifyClientId>
clientSecret=<YourSpotifyClientSecret>
youtubeApiKey=<YourYoutubeApiKey>
```

## Endpoints
The following endpoints are implemented so far:
* [/playlists/top](http://localhost:8080/playlists/top) 
* [/playlists/custom](http://localhost:8080/playlists/custom)
* [/playlists/youtube/find-video-id](http://localhost:8080/playlists/youtube/find-video-id)

## Local Development
1. Run `mvn clean install` to build the project, or `scripts/build.sh` to include dependencies.
2. Start the server with `mvn spring-boot:run`
3. Open [localhost:8080](http://localhost:8080) in your browser to see the app, or access the endpoints directly.

Step 3 assumes that the frontend code has already been built (which is done for you in `scripts/build.sh`). 
Alternatively you can run the front-end code separatly, see the corresponding README file for that project.

## Deployment
Currently supports
- Docker (Dockerfile supplied) 
- Google App Engine: simply run `scripts/deploy-gae.sh`. 
Requires [GCLOUD SDK](https://cloud.google.com/sdk/) to be installed.
