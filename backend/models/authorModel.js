const db = require("../database")


// section for GET BY queries // 
module.exports.getAllAuthors = () => {
    return db.query("SELECT * FROM author")
}

module.exports.getAuthorsById = (id) => {
    return db.query("SELECT * FROM author WHERE authorID = ?", [id])
}

module.exports.getAuthorsByName = (name) => {
    return db.query("select * from author where name like ?" , [name])
}

module.exports.getAuthorBySurname = (surname) => {
    return db.query("select * from author where surname like ?", [surname])
}

module.exports.getAuthorByNationality = (nationality) => {
    return db.query("select * from author where nationality like ?", [nationality])
}

module.exports.getAuthorByBirthYear = (mango) => {
    return db.query("select * from author where birthYear = ?" , [mango])
}

module.exports.getAuthorByDeathYear = (deathYear) => {
    return db.query("select * from author where deathYear = ?", [deathYear])
}

// Get By section complete -- revise birth and death year --


// Add author //

module.exports.createAuthor = (name, surname, nationality, birthYear, deathYear) => {
    return db.query("Insert into author (name, surname, nationality, birthYear, deathYear) "
    + "VALUES(?,?,?,?,?)", [name, surname, nationality, birthYear, deathYear])
}