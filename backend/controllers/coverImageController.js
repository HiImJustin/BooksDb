const express = require("express")
//Create a router so that we can define API routes in this file.
const router = express.Router()
const coverImageModel = require("../models/coverImageModel")

router.get("/coverimages", (req, res) => {
    coverImageModel.getAllCoverImages()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})










module.exports = router