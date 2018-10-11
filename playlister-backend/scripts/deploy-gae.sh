#!/usr/bin/env bash

# Build frontend
cd ../playlister-frontend/
ng build --prod

# Build backend
cd ../playlister-backend
mvn clean install

# Deploy to Google AppEngine
mvn appengine:deploy
