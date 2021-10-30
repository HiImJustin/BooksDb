const express = require("express")
const session = require('express-session');
const server = express()
const port = 8080

server.use(session({
	secret: 'apples',
	resave: true,
	saveUninitialized: true
}));

//server static front end resources
server.use(express.static("frontend"))

//Enable middleware for JSON and urlecoded form data
server.use(express.json())
server.use(express.urlencoded({extended: true}))

// link up book Controller 
const bookController = require("./backend/controllers/bookController")
server.use("/api", bookController)

//link up author controller, this allows us to access things in that folder
const authorController = require("./backend/controllers/authorController")
server.use("/api", authorController)

//link up user controller
const userController = require("./backend/controllers/userController")
server.use("/api", userController)

//link up changeLog
const changeLogController = require("./backend/controllers/changeLogController");
server.use("/api", changeLogController)


//start the express server
server.listen(port, () => {
    console.log("server listening on http://localhost:" +port)
})

