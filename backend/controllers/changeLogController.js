const express = require("express")

const router = express.Router()


const changeLogModel = require("../models/changeLogModel")
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")

router.post("/changelog", (req, res) => {
    
    let book = req.body
    let user = req.body

    changeLogModel.changeLogCreate(
        book.bookID,
        user.userID
    )
    .then((results) => {
        res.status(200).json("change log created" + results.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("no log made")
    })
})

router.post("/updatelog", (req, res) => {
    
    let user = req.body
    
    changeLogModel.updateLogCreate(
        user.bookID,
        user.userID
    )
    .then((results) => {
        console.log(results)
        res.status(200).json("change log created" + results.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("no log made")
    })
})

router.get("/changeloginfo", (req, res) => {
    changeLogModel.booklog()
    .then((results) => {
        if(results.length > 0) {
            res.status(200).json(results)
        }   else {
                res.status(404).json("failed to find that book")
        }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})

module.exports = router