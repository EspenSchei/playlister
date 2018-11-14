# Playlister
Watch your favourite music videos on YouTube, based on any Spotify playlist.

_Initially created as a fun excercise to learn [Angular](https://angular.io/), and get familiar with 
[Google App Engine](https://cloud.google.com/appengine/)._

## Project structure
This is a monorepository for the Playlister app, containing two different projects.
 
### playlister-backend
A Java 8 Spring Boot app containing all the backend code, and exposing the necessary API's.
It currently supports fetching playlists through the Spotify API's, and searching for a matching YouTube video id.

### playlister-frontend
An Angular 6 app containing all the front-end code.

## Getting started
The project is already configured to be deployed with Docker or Google App Engine.

For local development see the README.md file the different projects.
