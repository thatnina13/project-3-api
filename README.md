# Project 3 client

# Application Title: Party On
This application allows the user to Party and chill with Flamingos. More specifically, this SPA allows a user to view existing parties without having to sign up or sign in- making sure that everyone who wants to party, knows which parties are out there! Additionally, after signing in, a user can create a party or a flamingo, update a party or a flamingo, delete a party or flamingo and view their RSVPs.
But why? why go through all the trouble to create a web app mainly for cataloging parties? Because parties are excellent.(so are flamingos) (please read the previous sentence in Garth voice)
## Important Links
- [API Repo](https://github.com/hippogitamus/project-3-api)
- [Deployed API](https://safe-hollows-46259.herokuapp.com/)
- [Deployed Client](https://hippogitamus.github.io/project-3-client/)
## Planning Story
With Eron's guidence, I decided to create a new- totally unrelated resource. I made this decision intentially, and in order to avoid any confusion between the existing relatioships and the relationship of the user to the new Flamingo resource.

Following this decision, I started by creating the models and routes on the express backend. Following testing, I transition to creating the required Javascript functions. From there, I styled the sigth using Handlebars and Bootstrap.
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
As a signed in user, I would like to create my own flamingo.
As a signed in user, I would like to update my own flamingo.
As a signed in user, I would like to delete my own flamingo.
As a signed in user, I would like to see all flamingos.


### Party on ERD
![Party On](https://imgur.com/NoBQbS5)
### Party on Wire Frames V2- Flamingos
![Party On](https://imgur.com/LnidV9s)
### Unsolved Problems & Future Goals
Future goals for Party On

I would like to create and store two different arrays- the first of images realting to partying, the second relating to flamingos. From there I would like to create some functionality so that any time a user clicked "show my flock," "Get all Flamingos", "Show my parties" or "Get all Parties" an image from either arry would be randomly selected to fill the image element of the bootstrap card. This would be a first step to stylize the app furhter until we could reach the ideal end state: allowing a user to upload an image to their party or flamingo. The image would be store and would be represented when that party (or flamingo) was retrieved later.

Additionally, I would like to make the emoji toggle actually functional! Ideally the toggle will be used to RSVP to parties. I'm not exactly sure how it could be made functional for the flamingo's. That said, I can never resist a good pile of 💩 :poop:. I realized that in order to have a RSVP toggle, it would actually need to have three positions or values. In my head it will work something like this: left: RSVP true, middle:RSVP nutrual, right: RSVP false.

Finally, I would like to change the display for Show all Parties and Get all Flamingos. Right now, the data is displayed in cards and all cards recieve the same image.  Ideally, any data- parties or flamingos, created and owned by the user will have the same image assigned to the card when "show my parties" or "show my flock" is run.
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
GET | /flamingo
GET | /flamingo/:id
POST | /flamingo/:id
PATCH | /flamingo/:id
DELETE | /flamingo/:id
