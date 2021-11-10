// Access the database connection
const db = require ("../database")

//
let curdate = new Date()

module.exports.changeLogCreate = (bookID, userID) => {
    return db.query("insert into changelog (bookID, userID, dateCreated) "
    + "VALUES (?,?, curdate())", [bookID, userID])
}

module.exports.updateLogCreate = (bookID, userID, curdate,) => {
    return db.query("insert into changelog (bookID, userID, dateChanged) "
    + "VALUES (?, ?, curdate())", [bookID, userID, curdate])
}