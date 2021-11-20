const db = require("../database")
// gets all the coverimages from coverimage
module.exports.getAllCoverImages = () => {
    return db.query("Select * from coverImage")
}
// Adds a new image url path into the database
module.exports.addCoverImage = ( coverImagePath) => {
    return db.query("Insert into coverImage (coverImagePath + Values(?)", 
    [coverImagePath] )
}