// Access the database connection
const db = require ("../database")

//
const curdate =  Date();

module.exports.changeLogCreate = (bookID, userID) => {
    return db.query("insert into changelog (bookID, userID, dateCreated) "
    + "VALUES (?,?, curdate())", [bookID, userID])
}

module.exports.updateLogCreate = (bookID, userID, curdate,) => {
    return db.query("insert into changelog (bookID, userID, dateChanged) "
    + "VALUES (?, ?, curdate())", [bookID, userID, curdate])
}

module.exports.booklog = () => {
    return db.query("select * from changelog where dateChanged is not null or dateCreated is not null")
}