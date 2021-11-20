const express = require("express")

const router = express.Router()

const changeLogModel = require("../models/changeLogModel")

//Api endpoint for creating a new change log
router.post("/changelog", (req, res) => {
    
    let book = req.body
    let user = req.body

    changeLogModel.changeLogCreate(
        user.userID,
        book.bookID
    )
    .then((results) => {
        res.status(200).json("change log created" + results.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("no log made")
    })
})

//Api endpoint POSTS data to update the update log
router.post("/updatelog", (req, res) => {
    
    let book = req.body
    let user = req.body
    
    changeLogModel.updateLogCreate(
        user.userID,
        book.bookID
    )
    .then((results) => {
        console.log(results)
        res.status(200).json("change log updated " + results.insertId)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("no log made")
    })
})

//Api endpoint that GET's the info from the changelog
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