// Load existing Data
let urlParamters = new URLSearchParams(window.location.search)
let authorID = urlParamters.get("id")
let bookID = urlParamters.get("id")

Promise.all([
        fetch(`/api/books/${bookID}`).then(value => value.json()),
        fetch(`/api/author/${authorID}`).then(value => value.json())
    ])
    .then((res) => {
        let book = res[0]
        let author = res[1]
        console.log(book)

        document.getElementById("delete-book-list").innerHTML += `
        <article id="delete-book">
            <img id="img" src="../images/${book.coverImagePath}.jpg">
            <h1>${book.bookTitle}</h1>
            <h2>${book.originalTitle}</h2>
            <h3>${book.yearofPublication}</h3>
            <h3>${book.genre}</h3>
            <h3>${book.languageWritten}</h3>
            <input type="button" id="delete" onclick="deleteBook()" value="Delete">
            <input type="button" id="cancel-delete-book" onclick="cancel()" value="Cancel">
        </article>
            `
    })

function deleteBook() {
    const deleteMethod = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch('/api/book/delete?id=' + bookID, deleteMethod)
        .then(res => res.json())
        .then(res => {
            console.log("book deleted succesfully")
            window.location.href = "book_list.html"
        })  
        .catch(error => {
            console.log("couldnt delete book" + error)
        })
}
function cancel() {
    if(cancel) {
        window.location.href = "book_list.html"
    }
}