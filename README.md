# GrocListUI

This react.js project serves as the home for a WEB UI for GrocList Rest API

### What is GrocList
Groclist is short for Grocery List. The idea is that if a user can supply our app with a list of dishes he wants to cook in a single week, we can aggregate all the individual ingredients from each of these dishes and present a weeekly Grocery shopping List to the user (hence the name GrocList).

There are two sub-halves of this project. The backend and the frontend. The backend is a Java based spring-boot app(s) and the frontend is a ReactJS app. The backend is further divided into two apps a worker and a web-app. They also share a common library which is used for all the conversions like TbSP to TSP etc. 

### What does this UI subproject do?
This project aims to build a front end to interact with the user. This will include user login, user registration, user validation, fetching the input from the user, sending it to the backend and displaying the final result as a table. 


#### Development Guide:
1. Clone the project and run:
    1. `npm install`
    1. `npm start`
1. Standard React practices
1. Run `prettier --write src/*.js` before a code push to maintain clean code

#### ToDo:
1. Add a Makefile.
1. Dockerize and deploy
1. Add CSS
1. Support all workflows