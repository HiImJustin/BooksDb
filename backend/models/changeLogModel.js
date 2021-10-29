// Access the database connection
const db = require ("../database")

//

module.exports.changeLogCreate = ( bookID, userID) => {
    return db.query("insert into changelog (bookID, userID) "
    + "VALUES(?,?)", [bookID, userID])
}