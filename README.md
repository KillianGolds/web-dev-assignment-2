# Assignment 2 - Web API.

Name: Killian Golds

## Features.
 + Rerouted 9 of the original 13 front end endpoints to the back end api so that the front end calls the back end to make the fetches . 
 + Login page, registration page and signout functionality. 
 + Specific users favorites page based on the authenticated.
 + Users are stored on a MongoDB Atlas cluster, within the users collection each user has a favorites array where movie ids are stored.
 + Favorites and movies review form are protected routes.

## Setup requirements.
Install:
 + Node
 + Cors
 + Babel
 + Mongoose
 + JsonWebToken
 + Bcrypt

## API Configuration
Create the following .env files for the front end and back end:
______________________
### Frontend React .env File
REACT_APP_TMDB_KEY=[tmdb-api-key]  
FAST_REFRESH=false  
REACT_APP_API_BASE_URL=http://localhost:8080  
SECRET=ilikecake
______________________
### Backend Express .env File:
NODE_ENV=development  
PORT=8080  
HOST=localhost  
MONGO_DB=mongodb+srv://{username}:{password}@moviescluster.i4ustcp.mongodb.net/movies?retryWrites=true&w=majority  
TMDB_KEY=[tmdb-api-key]  
SECRET=ilikecake
______________________

## API Design
Here is my api route handlers:

### Actors Route Handler
- /actors/popular | GET | Get a list of the Popular Actors
- /actors/{actorId} | GET | Get the details of an Actor
### Movies Route Handler
- /movies/discover | GET | Get a list of movies from TMDB discover collection 
- /movies/movie/{movieId} | GET | Get a specific movie
- /movies/movie/{movieId}/reviews | GET | Get the list of reviews for a specific movie
- /movies/upcoming | GET | Get a list of upcoming movies from TMDB
- /movies/genres | GET | Get a list of the genres
- /movies/{movieId}/cast | GET | Get a list of cast for a specific movie
- /movies/search | GET | Get a movie or actor from a search query
### Users Route Handler
- /api/users/ | GET | Get all users
- /api/users/ | POST | Create a user
- /api/users/{userId} | PUT | Update a specific user
- /api/users/{userId}/favorites | POST | Add a movie to a specific users favorites array
- /api/users/{userId}/favorites | GET | Get a list of favorites for a specific users
- /api/users/{userId}/favorites/{movieId} | Delete | Delete a favorite from a users favorites collection
  
## Security and Authentication
The API uses JWT for secure authentication. The following routes are protected and require a valid JWT Bearer token in the Authorization header:
- /reviews/form
- /movies/favorites

## Integrating with React App
All views except the home page (due to overwhelming amount of errors due to the tab logic from the first assignment) are handled by the back end api.

## Independent learning (if relevant)
Online research used to complete this assignment:

+ https://react.dev/learn
+ https://www.w3schools.com/Js/
+ https://www.w3schools.com/react/
+ https://mui.com/material-ui/
+ https://www.codecademy.com/
+ https://www.freecodecamp.org/
+ https://www.youtube.com/watch?v=FB-sKY63AWo#:~:text=In%20this%20video%20you%20will,If%20yo&ab_channel=FrontStart
+ https://jsramblings.com/authentication-with-node-and-jwt-a-simple-example/
+ https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
+ https://www.youtube.com/watch?v=b9WlsQMGWMQ&ab_channel=PedroTech
