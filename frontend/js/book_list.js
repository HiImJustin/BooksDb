fetch("/api/allbookinfo")
    .then(response => response.json())
    .then(books => {
        let book_list = document.getElementById("book-list")
        console.log(books)
    //Does a loop for each iteration of books
    for (let book of books) {

        //Originally was removing any null or undefined or blank values from books
        //Books didnt originally have a craeted Date
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
        // Changes the Date format to remove unwated characters
        let dateCreated = book.dateCreated;
        dateCreated = dateCreated.split(" ")[0];
        //Same as above        
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
        <h3 id="userid">Updated by: ${book.username}</h3>
        <a href="update_book.html?id=${book.bookID}">Edit</a>
        <a href="delete_book.html?id=${book.bookID}">Delete</a>
    </article>
        `
    }
})

