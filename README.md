# SiLa
Sign Language Recognition

In this application the main goal is to recognize hand figures.
The hand figure recognition is for searching in a list of hand figures and return the possible Signs you could make with the hand figure. 
This is to search in the database.
The hand figure gets tracked with a leap motion and nodeJS.
The database used is MongoDB.

The hardware that is being used in this application are
- Your webcam
- A leap motion

The Language and extensions used in this application are
- Nodejs
- Javascript
- HTML/CSS
- MongoDB
- ExpressJS
- LeapJS
- SocketIO

The files and what they contain are
- Index.ejs (Starting page with instruction video and first experience with the interaction in the application)
- Server.js (The complete backend of the application, which contains all database connections)
- SignDB.ejs (The application itself as described above)
- scriptSignDB.js (the javascript for almost everything on the SignDB page, mostly sending fingerarrays to the backend and receiving the responses.)
- DropDownScript.js (the code for the link between the real dropdown that can't contain pictures and is not visible, and the fake dropdown that does contain pictures)
- script.js ( The script linked with Index.ejs, which contains the first interaction)
- style.css (All basic style things)
- dropDownStyle.css ( Style for the fake dropdown)
