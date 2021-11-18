const db = require("../database")

module.exports.getAllCoverImages = () => {
    return db.query("Select * from coverImage")
}
module.exports.addCoverImage = ( coverImagePath) => {
    return db.query("Insert into coverImage (coverImagePath + Values(?)", 
    [coverImagePath] )
}