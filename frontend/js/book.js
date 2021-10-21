function postAddBook() {

    // Get access to the add book form element

    let addBookForm = document.getElementById("add_book")

    // Convert the user form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(addBookForm)));

    // Post form data to the API

    fetch("/api/book/add",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: formDataJSON,
        })
}

fetch("../api/book/")
    .then(response => response.json())
    .then(books => {
        console.log(books)
        let book_list = document.getElementById("book-list")

    for (let book of books) {
        book_list.innerHTML += `
    <article class="book">
        <h1>${book.bookTitle}</h1>
        <h2>${book.authorID}</h2>
        <h3>${book.genre}</h3>
    </article>
        `
    }

})