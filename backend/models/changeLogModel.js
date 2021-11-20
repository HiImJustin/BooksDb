// Access the database connection
const db = require ("../database")
//Inserts into the changelog query
module.exports.changeLogCreate = (bookID, userID, dateCreated) => {
    return db.query("insert into changelog (bookID, userID, dateCreated) "
    + "VALUES(?,?, curdate())", [bookID, userID, dateCreated])
}
// UPdates the changelog query
module.exports.updateLogCreate = (bookID, userID, dateChanged) => {
    return db.query("UPDATE changelog SET userID = ?, dateChanged = curdate() Where bookID = ? ", [bookID, userID, dateChanged])
}
// Gets all data from the booklog query
module.exports.booklog = () => {
    return db.query("select * from changelog")
}