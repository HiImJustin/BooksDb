const express = require("express")

const router = express.Router()


const changeLogModel = require("../models/changeLogModel")
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")

router.post("/changeLog", (req, res) => {
    
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

router.post("/updateLog", (req, res) => {
    
     book = req.body,
     user = req.body
    

    changeLogModel.updateLogCreate(
        book.bookID,
        user.userID
    )
    .then((results) => {
        console.log(results + " hello")
        res.status(200).json("change log created" + results.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("no log made")
    })
})


module.exports = router