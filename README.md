# NBA Application
NBA Teams Application Using NodeJS, MongoDB, GraphQL & ReactJS

## Introduction
- I love basketball in general and the NBA in particular, so I created a simple app that displays and manipulate data of NBA teams.
- My incentive of building this project is to learn how to work with GraphQL, because it's my first time using it.
- I encountered with some roadblocks in this project, because it's a new technology that I have not studied before but eventually I succeeded.

## Back-End Summary
- Data Base with two collections, stores the players and teams data.
- Each collection (players & teams) have a Business Logic module contains the CRUD functionality of the data base.
- GraphQL API 

## Set Up
- Create a MongoDB data base -> "teamsDB" and change the url connection in server/configs.
- Create two empty collections: 
1. players
2. teams
- In server folder: 
1. Run "npm install" to download all dependencies.
2. Run file putDataInDB.js to put data in the data base.
3. Run "node index" to run the server
- In client/nbaapp folder:
1. Run "npm install" to download all dependencies.
2. Run "npm start" to run the app (http://localhost:3000)

## How To Use The Application
- You are presented with names of teams, click on a team will show team details: name, record, number of titles & list of his players.
- Click on a player will present player details: name, age, avgPoints & current team.
- You have the option to edit, delete & add team and a player
- You can alse trade a player of your choice in player details section.

## Technologies
- JavaScript
- NodeJS
- GraphQL
- MongoDB
- ReactJS
