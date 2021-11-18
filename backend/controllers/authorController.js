const express = require("express")
//Create a router so that we can define API
// routes in this file.
const router = express.Router()
//Access author model so we can return authors and thier
// data in this file
const authorModel = require("../models/authorModel")

const {body, validationResult} = require('express-validator')

const {
    validateAuthor
} = require('../models/Validator')

// Define a /api/authors end point so we can see an
// array of all authors.
router.get("/authors", (req, res) => {
    //Gets the function from authorModel
    authorModel.getAllAuthors()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            //This log any errors to the node console, very useful
            console.log(error)
            res.status(500).json("query error")
        })
})

// Section for Get By functions //

// Define an /api/authors/:id endpoint that respons
// with a specific author by id
router.get("/author/:id", (req, res) => {
    authorModel.getAuthorsById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            }   else {
                res.status(404).json("failed to find author by id")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error for authors")
        })
})

//defines an api endpoint that gets author by firstname
router.get("/author/name/:name", (req, res) => {
//links to authorModel which contains my query
    authorModel.getAuthorsByName(req.params.name)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find author by that name")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error for authors")
        })
})

//api endpoint that get author by their surname
router.get("/author/surname/:surname", (req, res) => {
    authorModel.getAuthorBySurname(req.params.surname)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find an author with that surname")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error for author surname")
        })
})

//api endpoint that gets author by their nationality
router.get("/author/nationality/:nationality", (req, res) => {
    authorModel.getAuthorByNationality(req.params.nationality)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find author with that nationality")
            }
        })
        .catch((error) =>{
            console.log(error)
            res.status(500).json("query error for author nationality")
        })
})

//api/endpoint that gets author by their birthyear 
//THIS PROBABLY ISNT A USEFUL SEARCH FUNCTION
router.get("/author/birthYear/:mango", (req, res) => {
     authorModel.getAuthorByBirthYear(req.params.mango)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(400).json("failed to find author with that birthYear")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to find that birthYear")
        })
})
router.get("/author/deathYear/:deathYear" , (req, res) => {
    authorModel.getAuthorByDeathYear(req.params.deathYear)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(400).json("failed to find that deathyear")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to query that deathyear")
        })
})
// Get by functions complete

// Start of add functions //

router.post("/create/author", validateAuthor, (req, res) => {

    let author = req.body

    authorModel.createAuthor(
        author.name,
        author.surname,
        author.nationality,
        author.birthYear,
        author.deathYear
    )
    .then((results) => {
        res.status(200).json("Author Create with id " + results.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("couldnt create author")
    })
})


router.post("/author/delete", (req, res) => {

    let authorId = req.query.id
/* 
     let bookId = req.body.bookId
 */
    authorModel.deleteAuthor(authorId)
        .then((result) => {
            if(result.affectedRows > 0 ) {
                res.status(200).json("Author Delete Succesfully")
            }   else {
                res.status(404).json("failed to delete Author - query error id=" + AuthorId)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete Author")
        })
    })

router.post("/author/update", validateAuthor, (req, res) => {

    let author = req.body

    authorModel.updateAuthor(
        author.authorId,
        author.name,
        author.surname,
        author.nationality,
        author.birthYear,
        author.deathYear
    )
    .then((result) => {
        if(result.affectedRows > 0 ) {
            res.status(200).json("author updated")
        }   else (
            res.status(404).json('author not found')
        )
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("failed to update author")
    })    
})




//This allows the server.js to import (require)
// routes define in this file.
module.exports = router