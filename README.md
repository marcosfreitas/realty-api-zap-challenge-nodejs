# eng-zap-challenge-nodejs

## Environment

Developed on a simple container with:

npm version: 6.13.0
nodejs version: 12.13.0

## How to run and test

First, this is the link to the Postman Collection with endpoint produced, download it and import into Postman App: https://www.getpostman.com/collections/6a483596df4f1161d0dd

**The API has the prefix /api**
**The full endpoint is http://localhost:3000/api/realty/**

Into a machine (or container) with nodejs and npm configured, **rename the file .env.example** (yeah, there is a URL), now, just execute `npm install` and `npm start`;

## How it works

This project uses express framework to manipulate requests and routes, filesystem module to save the data source after requests at the first time with axios library, the dotenv package to read the .env file and nodemon to maintain it running...

PS.: There is some console.log left behind just to you follow the thing. :)
