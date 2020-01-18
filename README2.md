# Project 3 client
# Application Title: Party On
This application allows the user to Party. More specifically, this SPA allows a user to view existing parties without having to sign up or sign in- making sure that everyone who wants to party, knows which parties are out there! Additionally, after signing in, a user can create a party, update a party, delete a party and view their RSVPs.
But why? why go through all the trouble to create a web app mainly for cataloging parties? Because parties are excellent. (please read this sentence in Garth voice)
## Important Links
- [API Repo](https://github.com/hippogitamus/project-3-api)
- [Deployed API](https://safe-hollows-46259.herokuapp.com/)
- [Deployed Client](https://hippogitamus.github.io/project-3-client/)
## Planning Story
It was early on Tuesday Morning, when Caley, Simon, Ryan and Nina came together to talk over the "hangout" prompt. As a group, the four broke down the different requirements and their associated features for both the back end and the front end.
Simon and Ryan paired off to Para-program the front end, specifically they html  and handlebars framework for each feature, as Caley and Nina tackled the API for GET, SHOW and DELETE Parties. Following a schedule that divided each day into two mini sprints with Stand-ups in the morning, before lunch and before end of day- MPV was reached by end of day Wednesday 1/8/2020. Thursday was use to focus on styling and functionality of myRSVP button, which would return the Parties the signed in user had RSVP'ed too.
### User Stories
As an unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As an unregistered user, I would like to see all parties.
As a signed in user, I would like to RSVP to an party.
As a signed in user, I would like to create my own party.
As a signed in user, I would like to update my own party.
As a signed in user, I would like to delete my own party.
### Party on Wire Frames
![Party On](https://imgur.com/JP3hvAb)
### Party on ERD
![Party On](https://imgur.com/FY7RsHB)
### Unsolved Problems & Future Goals
Upon completion of the project, Party on had one relational bug: the owner of a party was being is stored in a 'user' key. This meant that a user was able to update the Owner of a party or RSVP. This was fixed in our second interation of Party On.
Future goals for Party On include a functionality which will notify a party owner
when a RSVP is submitted for a given party. Ideally this notification will include the user name of the atendee as well as a current total number of attendees for the
event in question.
### Technologies Used
- jQuery
- HTML/CSS
- Bootstrap
- Javascript
- Hanglebars
- Mongoose
- MongoDB
- Node
- Express
### Catalog of Routes
Verb         |	URI Pattern
------------ | -------------
GET | /party
GET | /party/:id
POST | /party/:id
PATCH | /party/:id
DELETE | /party/:id
