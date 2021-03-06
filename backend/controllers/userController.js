const express = require("express")
// allows us to use api from server
const router = express.Router()
// requires the userModel
const userModel = require("../models/userModel")
// npm install bcrypt
const bcrypt = require("bcrypt")

//npm install validator
const validator = require("validator")
const { validateUser } = require("../models/Validator")
const {body, validationResult, check} = require('express-validator');

// Get all users expect their password
router.get("/users", (req, res) => {
    userModel.getAllUsers()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})

// Get user by Id
// /api/users/userid/?
router.get("/users/:id", (req, res) => {
    userModel.getUserById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find user by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error for authors")
        })
})

//api end point for users first name /api/users/firstName/?
router.get("/users/firstName/:firstName", (req, res) => {
    userModel.getUserByfirstName(req.params.firstName)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("no user found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("user not found")
        })
})

// api endpoint for users lastName /api/users/lastName/?
router.get("/users/lastName/:name", (req, res) => {
    userModel.getUsersByLastName(req.params.name)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("no user with that last name")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("no user found with that last name")
        })
})

//api endpoint for email
router.get("/users/email/:email", (req, res) => {
    userModel.getUserByEmail(req.params.email)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("no one has that email here")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("nope, that email doesnt exist")
        })
})

//api endpoint for get by accessRights
router.get("/users/accessRights/:accessRights", (req, res) => {
    userModel.accessRights(req.params.accessRights)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("nope he doesnt exist")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("nup")
        })
})

//POSTS user data to the Api endpoint then to the database
router.post("/users/create", validateUser, (req, res) => {
    //req.body represents the form field data (json in body of fetch)
    let user = req.body
    // Hash the password before inserting into the database
    let hashedPassword = bcrypt.hashSync(user.password, 5)
    // If user is not admin, stop the create new user
    if(req.session.user.accessRights === "Admin") {
        console.log("user is an admin")
    }   else {
        return console.log('not an admin')
    }
    // Each of the following names refercne the "name" attribute in the inputs of the form.
    userModel.createUser(
            validator.escape(user.firstName),
            validator.escape(user.lastName),
            validator.escape(user.email),
            validator.escape(user.username),
            hashedPassword, // we now store the hashed password 
            validator.escape(user.accessRights)
        )
        .then((results) => {
            if(results.affectedRows > 0) {
            res.status(200).json("user created with id " + results.insertId)
        } else {
            res.status(404).json("user not created")
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("query i hate this error - failed to create user")
    })

})

//POSTS Update form data to update a user
router.post("/users/update", validateUser, (req, res) => {
    // The req.body represents the posted json data from the form
    let user = req.body
    //If the password does not start a $ then we need to hash it
    let hashedpassword = user.password
    if (!user.password.startsWith("$2b$")) {
        hashedpassword = bcrypt.hashSync(user.password, 6)
    }
    //each of the names below reference the "name" attritube in the form
    userModel.updateUser(
            user.userID,
            user.firstName,
            user.lastName,
            user.email,
            user.username,
            hashedpassword, // Use the hases password
            user.accessRights
        )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("user updated")
            } else {
                res.status(404).json("user not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to update user - query error")
        })
})

//POST sends the delete request to the database
router.post("/users/delete", (req, res) => {
    //Access the user id from the body of the request
    let userId = req.query.id

    //Ask the model to delete the user with userID 
    userModel.deleteUser(userId)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("user deleted successfully")
            } else {
                res.status(404).json("couldnt find that user to delete")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete user - query error")
        })
})

//login function
/* router.post("/users/login", (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    if (req.session && req.session.loggedin && req.session.loggedin === true) {
        res.status(200).json("you're already logged in")
    } else
    if (username && password) {
        userModel.userLogin(username, password)
            .then((results) => {
                if (results.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    res.status(200).json("user logged in successfully")
                    console.log(username)
                    console.log(req.cookies)
                    console.log(req.session)
                } else {
                    res.status(500).json('wrong username or password')
                }
            })
            .catch((error) => {
                console.log(error)
                res.status(500).json("user name or pass wrong idiot")
            })
    }
}) */

//test if sessions is actually working, gets all the user info that is made in the login
router.get('/secret',(req,res) => {
    if(req.session.user){
     result = req.session.user
     res.status(200).json(result)
    }  else {
         console.log("trash")
    }  
})

// Api endpoint for logout, destroys the session
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(400).json("unable to logout")
            } else {
                res.status(200).json("logout complete beep boop")
            }
        })
    }
});

// Jaspers code for the class i missed
router.post("/users/login" , (req, res) => {
    // Get the login information
    let login = req.body
    // find a user with a matching username
    userModel.getUserByUsername(login.username)
        .then((results) => {
            // Did we find a user with matching username?
            if (results.length > 0) {
                // Get the first found users
                let user = results[0]

                //verify the users password
                if (bcrypt.compareSync(login.password, user.password)) {
                    // The user is now authenticated

                    // setup the session
                    req.session.user = {
                        userID: user.userID,
                        accessRights: user.accessRights,
                    }
                    res.status(200).json("login successful")
                } else {
                    // This else case runs if the password did NOT match.
                    res.status(401).json("login failed")
                }
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to login - query error")
        })
})

//Logs a user out, destroys the session
router.post("/users/logout" , (req, res) => {
    // Destory the session
    req.session.destroy()
    res.status(200).json("logged out successfully")
})

// This allows the server.js to import (require) the routes
// defined in this file.
module.exports = router