// Access the database connedtion from database.js
const db = require("../database")

// Get all by query Section //
// Get a list of all books
module.exports.getAllBooks = () => {
    return db.query("SELECT * FROM book")
}
// Gets a list of books by id
module.exports.getBookById = (id) => {
    return db.query("SELECT * FROM book inner join author on book.authorID = author.authorID WHERE BookId = ?", [id])
}
// get a list of books, sort by desc
module.exports.getLastBookId = (id) => {
    return db.query("select bookID from book Order by bookID desc", [id])
}
// gets a book by title
module.exports.getBookByTitle = (title) => {
    return db.query("select * from book where bookTitle = ?" , [title])
}
// gets book by original title
module.exports.getBookByOgTitle = (ogTitle) => {
    return db.query("select * from book where originalTitle = ?" , [ogTitle])
}
// get book by year of publication
module.exports.getBookByPublicationYear = (pub) => {
    return db.query("select * from book where yearofPublication = ?", [pub])
}
// gets book by genre
module.exports.getBookByGenre = (genre) => {
    return db.query("select * from book where genre = ?" , [genre])
}
// gets book by millions sold
module.exports.getBookByMillionsSold = (sold) => {
    return db.query("select * from book where millionsSold = ?" , [sold])
}
// gets book by langauge written in
module.exports.getBookBylanguage = (language) => {
    return db.query("select * from book where languageWritten = ?", [language])
}
// gets book by author 
module.exports.getBookByAuthor = (author) => {
    return db.query("select book.bookID, book.bookTitle, book.originalTitle, book.yearofPublication, book.genre, book.millionsSold, book.languageWritten "
    + " from book "
    + " inner join author "
    + " on book.authorID = author.authorID where author.name = ?", [author])
}

// End of get all by queries //

//Add book query //
module.exports.addBook = (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) => {
    return db.query("insert into book (bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID) " 
    + "VALUES(?,?,?,?,?,?,?,?)", [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID])
}

// Update query
module.exports.updateBook = (bookID, bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID ) => {
    return db.query("UPDATE book SET bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, languageWritten = ?, coverImagePath = ?, authorID = ? Where bookID = ?", [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID, bookID])
}

// Delete query
module.exports.deleteBook = (bookId) => {
    return db.query("Delete from book where bookID = ?", [bookId])
}

// gets all book info from book, changelog and users
module.exports.allbookinfo = () => {
    return db.query("select book.bookID, book.coverImagePath, book.bookTitle, book.authorID, book.yearofPublication, changelog.userID, "
    + "changelog.dateCreated, changelog.dateChanged, users.username from book left join changelog on book.bookID = changelog.bookID inner join users on users.userID = changelog.userID")
}

//gets user info query
module.exports.userinfo = () => {
    return db.query("select changelog.userID, users.username "
    + " from changelog inner join users "
    + " on changelog.userID = users.userID")
}
