// Access the database connedtion from database.js
const db = require("../database")

// Get all by query Section //

module.exports.getAllBooks = () => {
    return db.query("SELECT * FROM book")
}

module.exports.getBookById = (id) => {
    return db.query("SELECT * FROM book WHERE BookId = ?", [id])
}
module.exports.getLastBookId = (id) => {
    return db.query("select bookID from book Order by bookID desc", [id])
}

module.exports.getBookByTitle = (title) => {
    return db.query("select * from book where bookTitle = ?" , [title])
}

module.exports.getBookByOgTitle = (ogTitle) => {
    return db.query("select * from book where originalTitle = ?" , [ogTitle])
}

module.exports.getBookByPublicationYear = (pub) => {
    return db.query("select * from book where yearofPublication = ?", [pub])
}

module.exports.getBookByGenre = (genre) => {
    return db.query("select * from book where genre = ?" , [genre])
}

module.exports.getBookByMillionsSold = (sold) => {
    return db.query("select * from book where millionsSold = ?" , [sold])
}

module.exports.getBookBylanguage = (language) => {
    return db.query("select * from book where languageWritten = ?", [language])
}

module.exports.getBookByAuthor = (author) => {
    return db.query("select book.bookID, book.bookTitle, book.originalTitle, book.yearofPublication, book.genre, book.millionsSold, book.languageWritten "
    + " from book "
    + " inner join author "
    + " on book.authorID = author.authorID where author.name = ?", [author])
}

// End of get all by queries //

//Add book //
module.exports.addBook = (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) => {
    return db.query("insert into book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) " 
    + "VALUES(?,?,?,?,?,?,?,?)", [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID])
}

// Update
module.exports.updateBook = (bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath ) => {
    return db.query("UPDATE book SET bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, coverImagePath = ? Where bookID = ?", [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, bookID])
}

// Delete
module.exports.deleteBook = (bookId) => {
    return db.query("Delete from book where bookID = ?", [bookId])
}
