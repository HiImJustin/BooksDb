const express = require("express")
//Create a router so that we can define API routes in this file.
const router = express.Router()
const coverImageModel = require("../models/coverImageModel")


//API endpoint that GETS a list of all avaliable images
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