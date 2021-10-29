const express = require("express")

const router = express.Router()

const userModel = require("../models/userModel")

// Get all users expect their password
router.get("/users", (req, res ) => {
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
            }   else {
                res.status(404).json("failed to find user by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error for authors")
        })
})

//api end point for users first name /api/users/firstName/?
router.get("/users/firstName/:firstName" , (req, res) => {
    userModel.getUserByfirstName(req.params.firstName)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            }   else {
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
            }   else {
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
            if(results.length > 0) {
                res.status(200).json(results[0])
            }   else {
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
            }   else {
                res.status(404).json("nope he doesnt exist")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("nup")
        })
})

//Create new user
router.post("/users/create", (req, res) => {
    //req.body represents the form field data (json in body of fetch)
    let user = req.body

    // Each of the following names refercne the "name"
    // attribute in the inputs of the form.
    userModel.createUser(
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.password,
        user.accessRights
    )
    .then((result) => {
         res.status(200).json("user created with id " + result.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("query i hate this error - failed to create user")
    })

})

//Updates a user
router.post("/users/update", (req, res) => {
    // The req.body represents the posted json data from the form
    let user = req.body

    //each of the names below reference the "name" attritube in the form
    userModel.updateUser(
        user.userID,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        user.password,
        user.accessRights
    )
    .then((result) => {
        if(result.affectedRows > 0 ) {
            res.status(200).json("user updated")
        }   else {
            res.status(404).json("user not found")
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("failed to update user - query error")
    })
})

//delete
router.post("/users/delete", (req, res) => {
    //Access the user id from the body of the request
    let userId = req.query.id

    //Ask the model to delete the user with userID 
    userModel.deleteUser(userId)
        .then((result) => {
            if(result.affectedRows > 0) {
                res.status(200).json("user deleted successfully")
            }   else {
                res.status(404).json("couldnt find that user to delete")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete user - query error")
        })
})

// This allows the server.js to import (require) the routes
// defined in this file.
module.exports = router