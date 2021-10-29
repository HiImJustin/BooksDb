const express = require("express")

const router = express.Router()

const changeLogModel = require("../models/changeLogModel")


router.post("/changeLog", (req, res) => {
    
    let changelog = req.query.id

    changeLogModel.changeLogCreate(
        changelog.bookID,
        changelog.userID
    )
    .then((res) => {
        res.status(200).json("change log created")
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json("no log made")
    })
})


module.exports = router