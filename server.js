const express = require("express")
const session = require('express-session');

const server = express()
const port = 8080

const cookieParser = require('cookie-parser');

const oneDay = 1000 * 60 * 60 * 24;

// Session middleware
server.use(session({
	secret: 'apples',
	resave: false,
	cookie: {maxAge: oneDay, secure: false},
	saveUninitialized: false,
	name: "uniqueSessionID"
}));

// Access control middleware
server.use((req, res, next) => {
	// The user is logged in if they have session data
	let userLoggedIn = req.session.user != null

	// Define a list of allowed URL for non-logged in users
	let allowedURLs = [
		"/frontend/index.html",
		"/frontend/js/login.js",
		"/frontend/css/style.css",
		"/api/users/login"
	]

	// If the user is logged in
	if (userLoggedIn) {
		//let them through
		next()
	} else {
	// Else (they are not logged in)
		//check if the url they want is allowed
		if (allowedURLs.includes(req.originalUrl)) {
			// Allow the guest user through
			next()
		} else {
			// If no allowed - Redirect to the login page
			res.redirect("/frontend/index.html")
		}
	}
}) 

//Enable middleware for JSON and urlecoded form data
server.use(express.json())
server.use(express.urlencoded({extended: true}))

//allow the parsing of cookies
server.use(cookieParser());

//serving public files
server.use(express.static(__dirname))

//server static front end resources
server.use(express.static("frontend"))

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

