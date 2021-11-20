const db = require("../database")

// section for GET BY queries // 
module.exports.getAllAuthors = () => {
    return db.query("SELECT * FROM author")
}
// Gets authors by id
module.exports.getAuthorsById = (id) => {
    return db.query("SELECT * FROM author WHERE authorID = ?", [id])
}
// gets author by name
module.exports.getAuthorsByName = (name) => {
    return db.query("select * from author where name like ?" , [name])
}
// gets author by surname
module.exports.getAuthorBySurname = (surname) => {
    return db.query("select * from author where surname like ?", [surname])
}
// gets author by nationality
module.exports.getAuthorByNationality = (nationality) => {
    return db.query("select * from author where nationality like ?", [nationality])
}
// gets author by birth year
module.exports.getAuthorByBirthYear = (mango) => {
    return db.query("select * from author where birthYear = ?" , [mango])
}
// gets author by year of death
module.exports.getAuthorByDeathYear = (deathYear) => {
    return db.query("select * from author where deathYear = ?", [deathYear])
}

// Get By section complete -- revise birth and death year --


// Add author query//
module.exports.createAuthor = (name, surname, nationality, birthYear, deathYear) => {
    return db.query("Insert into author (name, surname, nationality, birthYear, deathYear) "
    + "VALUES(?,?,?,?,?)", [name, surname, nationality, birthYear, deathYear])
}

// Delete query
module.exports.deleteAuthor = (authorId) => {
    return db.query("Delete from author where authorID= ?", [authorId])
}

// Update author query
module.exports.updateAuthor = (authorID, name, surname, nationality, birthYear, deathYear) => {
    return db.query("UPDATE author SET name = ?, surname = ?, nationality = ?, birthYear = ?, deathYear = ? Where authorID = ?", [name, surname, nationality, birthYear, deathYear, authorID])
}