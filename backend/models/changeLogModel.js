// Access the database connection
const db = require ("../database")

module.exports.changeLogCreate = (bookID, userID, dateCreated) => {
    return db.query("insert into changelog (bookID, userID, dateCreated) "
    + "VALUES(?,?, curdate())", [bookID, userID, dateCreated])
}

module.exports.updateLogCreate = (bookID, userID, dateChanged) => {
    return db.query("UPDATE changelog SET userID = ?, dateChanged = curdate() Where bookID = ? ", [bookID, userID, dateChanged])
}

module.exports.booklog = () => {
    return db.query("select * from changelog")
}