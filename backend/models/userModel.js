// Link the database connection from database.js
const db = require("../database")

// Get all users function, everything but password

module.exports.getAllUsers = () => {
    return db.query("SELECT userId, firstName, lastName, email,username, accessRights "
    + "FROM users")
}

module.exports.getUserByfirstName = (firstName) => {
    return db.query("select userId, firstName, lastName, email, accessRights "
    + "from users where firstName = ?", [firstName])
}

module.exports.getUsersByLastName = (lastName) => {
    return db.query("select userId, firstName, lastName, email, accessRights "
    + "from users where lastName = ?", [lastName])
}

module.exports.getUserByEmail = (email) => {
    return db.query("select userId, firstName, lastName, email, accessRights "
    + "from users where email = ?", [email])
}

module.exports.accessRights = (accessRights) => {
    return db.query("select userId, firstName, lastName, email, accessRights "
    + "from users where accessRights = ?", [accessRights])
}
// End of get by section //

// CRUD Section //
// Create
module.exports.createUser = (firstName, lastName, email, username, password, accessRights) => {
    return db.query("INSERT INTO users (firstName, lastName, email, username, password, accessRights) "
    + "VALUES(?,?,?,?,?,?)", [firstName, lastName, email, username, password, accessRights])
}

// read users
module.exports.getUserById = (id) => {
    return db.query("SELECT userId, firstName, lastName, email, username, accessRights, password "
    + "FROM users WHERE userId = ?", [id])
}


//UPDAE USERS
module.exports.updateUser = (userId, firstName, lastName, email, username, password, accessRights) => {
    return db.query("UPDATE users SET firstName = ?, lastName = ?, email = ?, username = ?, password = ?, accessRights = ? Where userId = ?", [firstName, lastName, email, username, password, accessRights, userId])
}

//Delete user
module.exports.deleteUser = (userId) => {
    return db.query("Delete from users where userID= ?" , [userId])
}

//login

module.exports.userLogin = (username, password) => {
    return db.query('Select * from users WHERE username = ? AND password = ?', [username, password])
}

//current user

module.exports.currentUser = (username) => {
    return db.query('Select userID from users WHERE username = ?', [username])
}

//get users by user name
module.exports.getUserByUsername = (username) => {
    return db.query("select * from users where username = ?" , [username])
}
