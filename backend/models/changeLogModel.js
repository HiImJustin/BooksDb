// Access the database connection
const db = require ("../database")

module.exports.changeLogCreate = (bookID, userID) => {
    return db.query("insert into changelog (bookID, userID, dateCreated) "
    + "VALUES (?,?, curdate())", [bookID, userID])
}

module.exports.updateLogCreate = (userID, dateChanged,) => {
    return db.query("UPDATE changelog SET userID = ?, dateChanged = curdate() Where bookID = ? ", [userID, dateChanged])
}

module.exports.booklog = () => {
    return db.query("select * from changelog")
}