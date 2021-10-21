//Import mysql2 module so that we can talk to the database
const mysql = require ('mysql2');

// Create a connection to the database
const connnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bookdb'
})

// This wrapper wil allow the use of promise functions
// Like .then() and .catch() so that we can use it in an async
// Way along with expressJS.
// function query() {} same as below

const query = (sql, parameters) => {
    return new Promise((resolve, reject) => {
        connnection.query(sql, parameters, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

// Export the new query function so that the models can use it

module.exports = { query }