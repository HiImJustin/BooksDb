const express = require("express")

const router = express.Router()


const changeLogModel = require("../models/changeLogModel")
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")

router.post("/changeLog", (req, res) => {
    
    let changelog = req.body
    let book = req.body
    let userID = req.session

    changeLogModel.changeLogCreate(
        book.bookID,
        changelog.userID
    )
    .then((results) => {
        res.status(200).json("change log created" + results.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("no log made")
    })
})


module.exports = router