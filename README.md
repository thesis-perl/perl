
![Codify Demo](http://i.imgur.com/tZXANZS.gif)


Learn to code on your own time: [Codify](http://codifyme.prom "Codify")


# About
  Coding is hard. Finding a tutor is easy. Start learning today at Codify. Codify is an app that connects tutors and students, providing a feature-rich environment via video, code share, and text chat.

  Inline-style:
![alt text](https://s3.amazonaws.com/perlproject/Animation.gif "Logo Title Text 1")

# Getting Started
* Fork a copy of the repo. Clone it to your local machine.

* Next, you'll need to install our dependencies on your terminal:

```
$ npm install (cd into client folder)
```
```
$ bower install (cd into server folder)
```

* Also, you'll need to add a file for API keys:

```
  client/apiKey.js

  var accessKeyId = "insert key"; (AWS Key);
  var secretAccessKey = "insert secret";
  var bistriAppId = "insert id";
  var bistriAppKey = "insert key";
```
* And a MySQL database account:

  https://www.mysql.com/

To start the server and view the app on localhost:8000:

```
$ node server/server.js
```

# Milestones
* Setup code share via codeMirror & Socket.io
* Created private chatroom with Firebase
* Implemented video chat session using Bistri

# Technology & Links

* AngularJS <https://angularjs.org>
* NodeJS <https://nodejs.org/en/>
* ExpressJS <http://expressjs.com>
* MySQL <https://www.mysql.com>
* Knex <http://knexjs.org>
* Firebase <http://firebase.google.com>
* Socket.io <http://socket.io>
* Amazon Web Services <http://aws.amazon.com>
* Bistri <http://bistri.me>

## Team Members ##
* Ani Stepanyan
* Brandon Willis
* Jeong Min Lee
* Jonathan Lee
* Zoe Chen
