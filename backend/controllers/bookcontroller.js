const express = require("express")
//Create a router so that we can define API routes in this file.
const router = express.Router()
//Access the books model so that we can access book data in this file.
const bookModel = require("../models/bookModel")
const { validateBook } = require("../models/Validator");
const changelogModel = require("../models/changeLogModel");
// Define a /api/books endpoint that responds with an
// array of all books.
router.get("/allbookinfo", (req, res) => {
    bookModel.allbookinfo()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            // Log any errors to the node console
            console.log(error)
            res.status(500).json("query error")
        })
})

// Define an /api/books/:id endpoint that respons
// with a specific book by id
router.get("/books/:id", (req, res) => {
    // try to get the book from the data store in bookModel.js
    bookModel.getBookById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find book by id")
            }
        })
        .catch((error) => {
            //log sql errors to node console
            console.log(error)
            res.status(500).json("query error")
        })
})
//get last book id
router.get("/book/lastID", (req, res) => {
    bookModel.getLastBookId(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find last book id")
            }
        })
})
// defined an epi endpoint /api/book/title/:"title"
router.get("/book/title/:title", (req, res) => {
    bookModel.getBookByTitle(req.params.title)
        .then((bookTitle) => {
            if (bookTitle.length > 0) {
                res.status(200).json(bookTitle[0])
            } else {
                res.status(404).json("booktitle not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("book title not foundd")
        })
})

//api endpoint /api/book/yearOfPublication/:pub
router.get("/book/yearOfPublication/:pub", (req, res) => {
    bookModel.getBookByPublicationYear(req.params.pub)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results)
            } else {
                res.status(404).json("failed to find a book with that release year")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to find a book with that release year")
        })
})

// genre api endpoint /api/book/genre/:genre
router.get("/book/genre/:genre", (req, res) => {
    bookModel.getBookByGenre(req.params.genre)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results)
            } else {
                res.status(500).json("that genre doesnt exist")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(404).json("that genre doesnt exists dummy")
        })
})

router.get("/book/author/:author", (req, res) => {
    bookModel.getBookByAuthor(req.params.author)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results)
            } else {
                res.status(404).json("not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("not found")
        })
})

// ADD BOOK //
router.post("/book/add", validateBook, (req, res) => {

    let book = req.body
    
    bookModel.addBook(
            book.bookTitle,
            book.originalTitle,
            book.yearofPublication,
            book.genre,
            book.millionsSold,
            book.languageWritten,
            book.coverImagePath,
            book.authorID
        )
    changelogModel.changeLogCreate(
        book.bookID,
        book.userID,
        book.dateCreated
    )
        .then((results) => {
            res.status(200).json("book created with id " + results.insertId)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("please work for me")
        })
})

//Update a book
router.post("/books/update", validateBook, (req, res) => {

    let book = req.body

    bookModel.updateBook(
            book.bookID,
            book.bookTitle,
            book.originalTitle,
            book.yearofPublication,
            book.genre,
            book.millionsSold,
            book.languageWritten,
            book.coverImagePath
        )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book updated")
            } else {
                res.status(404).json("book not found")
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to update book")
        })
})

//Delete book
router.get("/book/delete", (req, res) => {

    let bookId = req.query.id
    /* 
            let bookId = req.body.bookId
        */
    bookModel.deleteBook(bookId)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("book deleted successfully")
            } else {
                res.status(404).json("failed to delete book - query error id=" + bookId)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("failed to delete book")
        })
})

 
  

//This allows the server.js to import (require)
// routes define in this file.
module.exports = router