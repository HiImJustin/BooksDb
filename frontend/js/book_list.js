fetch("/api/allbookinfo")
    .then(response => response.json())
    .then(books => {
        let book_list = document.getElementById("book-list")

    for (let book of books) {

        if (book.dateChanged === "null" || book.dateChanged === null 
            || book.dateChanged === "" || typeof book.dateChanged === undefined) {
            delete book.dateChanged
    
        }
        if (book.dateChanged === undefined) {
            book.dateChanged = ""
        }

        if (book.dateCreated === "null" || book.dateCreated === null 
            || book.dateCreated === "" || typeof book.dateCreated === undefined) {
            delete book.dateCreated
        }
        if (book.dateCreated === undefined) {
            book.dateCreated = ""
        }

        let dateCreated = book.dateCreated;
        dateCreated = dateCreated.split(" ")[0];
        
        let dateChanged = book.dateChanged;
        dateChanged = dateChanged.split(" ")[0];

        book_list.innerHTML += `
    <article id="book">
        <img id="img" src="../images/${book.coverImagePath}.jpg">
        <h1>${book.bookTitle}</h1>
        <h2 hidden>${book.bookID}</h2>
        <h2 hidden>${book.authorID}</h2>
        <h3>Year Published: ${book.yearofPublication}</h3>
        <h3 id="datecreated">Added on the: ${dateCreated}</h3>
        <h3 id="datechanged">Last updated: ${dateChanged}</h3>
        <h3 id="userid">Updated by: ${book.userID}</h3>
        <a href="update_book.html?id=${book.bookID}">Edit</a>
        <a href="delete_book.html?id=${book.bookID}">Delete</a>
    </article>
        `
    }
})

